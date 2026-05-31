import { setAuthCookie } from '@/lib/auth/cookies';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { createToken } from '@/lib/auth/token';
import {
  createAccount,
  createUser,
  findAccountById,
  findUserByEmail,
} from '@/lib/queries/user';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get('code');

    const state = searchParams.get('state');

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`);
    }

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: new URLSearchParams({
        code: code!,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.GOOGLE_REDIRECT_URI!}`,

        grant_type: 'authorization_code',
      }),
    });

    const tokens = await response.json();

    if (!response.ok) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`);
    }

    const userResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      },
    );

    const googleUser = await userResponse.json();

    if (!googleUser.id) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`);
    }

    const account = await findAccountById({
      provider: 'google',
      providerAccountId: googleUser.id,
    });

    if (state === 'link') {
      console.log('entrou aqui no link');
      const user = await getCurrentUser();
      if (!user)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`);

      const account = await findAccountById({
        provider: 'google',
        providerAccountId: googleUser.id,
      });

      if (account && account.userId !== user.id) {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_URL}/profile?error=google-already-linked`,
        );
      }

      if (account && account.userId === user.id) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/profile`);
      }

      if (!account) {
        await createAccount({
          provider: 'google',
          providerAccountId: googleUser.id,
          userId: user.id,
          googleEmail: googleUser.email,
        });
      }

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/profile?success=google-linked`);
    }

    const existEmail = await findUserByEmail(googleUser.email);

    if (!account && !existEmail) {
      const user = await createUser({
        name: googleUser.name,
        email: googleUser.email,
        image: googleUser.picture,
        password: null,
      });

      await createAccount({
        provider: 'google',
        providerAccountId: googleUser.id,
        userId: user.id,
        googleEmail: googleUser.email,
      });

      const token = await createToken(user.id);
      await setAuthCookie(token);
    }

    if (!account && existEmail) {
      await createAccount({
        provider: 'google',
        providerAccountId: googleUser.id,
        userId: existEmail.id,
        googleEmail: googleUser.email,
      });
      const token = await createToken(existEmail.id);
      await setAuthCookie(token);
    }

    if (account) {
      const token = await createToken(account.userId);
      await setAuthCookie(token);
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL!}/dashboard?success=authenticated`);
  } catch (error) {
    console.error('Erro durante Google OAuth callback:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`);
  }
}
