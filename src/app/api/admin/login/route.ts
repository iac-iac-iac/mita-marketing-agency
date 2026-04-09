import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createAdminToken } from '@/middleware';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 минут

// In-memory rate limiting (для production использовать Redis)
const loginAttempts = new Map<string, { count: number; lastAttempt: number; lockedUntil?: number }>();

export async function POST(request: NextRequest) {
  try {
    // Rate limiting по IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 };

    // Проверяем блокировку
    if (attempts.lockedUntil && Date.now() < attempts.lockedUntil) {
      const remaining = Math.ceil((attempts.lockedUntil - Date.now()) / 60000);
      return NextResponse.json(
        { error: `Слишком много попыток. Попробуйте через ${remaining} мин.` },
        { status: 429 }
      );
    }

    // Сбрасываем счётчик если прошло достаточно времени
    if (Date.now() - attempts.lastAttempt > LOCKOUT_TIME) {
      attempts.count = 0;
      attempts.lockedUntil = undefined;
    }

    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Пароль обязателен' },
        { status: 400 }
      );
    }

    // Получаем хеш пароля из переменных окружения
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminPassword && !adminPasswordHash) {
      console.error('ADMIN_PASSWORD или ADMIN_PASSWORD_HASH не установлен в .env.local');
      return NextResponse.json(
        { error: 'Ошибка конфигурации сервера' },
        { status: 500 }
      );
    }

    // Проверяем пароль (поддержка как plaintext, так и bcrypt хеша)
    let isValidPassword = false;

    if (adminPasswordHash && adminPasswordHash.startsWith('$2')) {
      // bcrypt хеш
      isValidPassword = await bcrypt.compare(password, adminPasswordHash);
    } else if (adminPassword) {
      // plaintext (для обратной совместимости, но с предупреждением)
      isValidPassword = password === adminPassword;
    }

    if (!isValidPassword) {
      // Увеличиваем счётчик попыток
      attempts.count += 1;
      attempts.lastAttempt = Date.now();

      if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
        attempts.lockedUntil = Date.now() + LOCKOUT_TIME;
        loginAttempts.set(ip, attempts);

        return NextResponse.json(
          { error: `Слишком много попыток. Попробуйте через 15 мин.` },
          { status: 429 }
        );
      }

      loginAttempts.set(ip, attempts);

      return NextResponse.json(
        { error: 'Неверный пароль' },
        { status: 401 }
      );
    }

    // Успешный вход — сбрасываем попытки
    loginAttempts.delete(ip);

    // Создаём JWT токен
    const token = await createAdminToken();

    // Создаём ответ с HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 дней
    });

    // Устанавливаем HTTP-only cookie
    response.cookies.set('admin_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 дней в секундах
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Ошибка входа' },
      { status: 500 }
    );
  }
}
