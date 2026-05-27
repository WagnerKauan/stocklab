'use server';

import { findUserByEmail } from '@/lib/queries/user';
import { compareHash } from '@/lib/auth/bcrypt';
import { createToken } from '@/lib/auth/token';
import { setAuthCookie } from '@/lib/auth/cookies';

export async function actionAuthUser(data: FormData) {
  const email = data.get('email') as string;
  const password = data.get('password') as string;
  const user = await findUserByEmail(email);

  if (!user) {
    return {
      status: false,
      errors: [
        {
          message: 'Email ou senha incorretos',
          field: 'secret',
        },
      ],
      code: 400,
    };
  }

  if (!user.password) {
    return {
      status: false,
      errors: [
        {
          message: 'Email ou senha incorretos',
          field: 'secret',
        },
      ],
      code: 400,
    };
  }

  const isValidPassword = await compareHash(password, user.password);

  if (!isValidPassword) {
    return {
      status: false,
      errors: [
        {
          message: 'Email ou senha incorretos',
          field: 'secret',
        },
      ],
      code: 400,
    };
  }

  const token = await createToken(user.id);

  await setAuthCookie(token);

  return {
    status: true,
    errors: [],
    code: 200,
  };
}
