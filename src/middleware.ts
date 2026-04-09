import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';

// Пути, требующие аутентификации
const adminPaths = ['/admin/blog', '/admin/cases', '/admin/services', '/admin/testimonials'];
const apiAdminPaths = ['/api/admin/blog', '/api/admin/cases'];

// Секрет для JWT (используем ADMIN_PASSWORD или fallback)
async function getSecret(): Promise<Uint8Array> {
  const password = process.env.ADMIN_PASSWORD || 'fallback-secret-for-build';
  const encoder = new TextEncoder();
  return encoder.encode(password);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Не проверяем login страницу
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Проверяем, является ли путь админским
  const isAdminPath = adminPaths.some(p => pathname.startsWith(p));
  const isApiAdminPath = apiAdminPaths.some(p => pathname.startsWith(p));

  if (!isAdminPath && !isApiAdminPath) {
    return NextResponse.next();
  }

  // Получаем токен из HTTP-only cookie
  const token = request.cookies.get('admin_auth_token')?.value;

  if (!token) {
    // Нет токена — редирект на login
    if (isApiAdminPath) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Верифицируем JWT токен
    const secret = await getSecret();
    await jwtVerify(token, secret);

    // Токен валиден — продолжаем
    return NextResponse.next();
  } catch {
    // Токен невалиден или истёк
    const response = isApiAdminPath
      ? NextResponse.json({ error: 'Токен истёк' }, { status: 401 })
      : NextResponse.redirect(new URL('/admin/login', request.url));

    // Удаляем невалидный токен
    response.cookies.delete('admin_auth_token');
    return response;
  }
}

// Helper для создания JWT токена (используется в API route)
export async function createAdminToken(): Promise<string> {
  const secret = await getSecret();
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
  return token;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
