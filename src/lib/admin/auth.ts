import { jwtVerify } from 'jose';

/**
 * Проверка JWT токена
 */
export async function verifyToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_API_KEY || 'fallback-secret-key'
    );

    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

/**
 * Проверка сессии администратора
 */
export function checkAdminSession(): boolean {
  if (typeof window === 'undefined') return false;

  const sessionData = localStorage.getItem('adminSession');
  if (!sessionData) return false;

  try {
    const session = JSON.parse(sessionData);
    
    // Проверяем срок действия
    if (Date.now() > session.expires) {
      localStorage.removeItem('adminSession');
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Выход из админки
 */
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminSession');
  }
}
