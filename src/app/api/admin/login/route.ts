import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Пароль обязателен' },
        { status: 400 }
      );
    }

    // Получаем пароль из переменных окружения
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD не установлен в .env.local');
      return NextResponse.json(
        { error: 'Ошибка конфигурации сервера' },
        { status: 500 }
      );
    }

    // Проверяем пароль
    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Неверный пароль' },
        { status: 401 }
      );
    }

    // Создаём простой токен (base64)
    const token = Buffer.from(`admin:${Date.now()}`).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 дней
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Ошибка входа' },
      { status: 500 }
    );
  }
}
