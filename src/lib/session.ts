'use server';

import { cookies } from 'next/headers';

export async function createSession(token: string) {
  if (!token) {
    throw new Error("No token");
  }

  (await cookies()).set('fetch-access-token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 60,
  });
}

export async function deleteSession() {
  (await cookies()).delete("fetch-access-token");
}