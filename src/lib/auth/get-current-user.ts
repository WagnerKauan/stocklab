'use server';

import { cookies } from 'next/headers';
import { User } from '../../../generated/prisma/client';
import { verifyToken } from '@/lib/auth/token';
import { findUserById } from '@/lib/queries/user';
import { cache } from 'react';

export const getCurrentUser = cache(async () => {
  const cookie = await cookies();

  const token = cookie.get('token');

  if (!token) return null;

  const payload = await verifyToken(token.value);

  if (!payload) return null;

  return await findUserById(payload.userId);
});
