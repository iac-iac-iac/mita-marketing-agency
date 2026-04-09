import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Удаляем HTTP-only cookie
  response.cookies.delete('admin_auth_token');

  return response;
}
