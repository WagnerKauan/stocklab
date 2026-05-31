import { NextResponse } from 'next/server';

//Essa rota faz o redirecionamento para a tela de login do google quando o usuário clicar no botão de
// login com google

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get('mode') || 'login';

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID!;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI!;

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,

      response_type: 'code',
      scope: 'openid email profile',

      state: mode,
    });

    return NextResponse.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
    );
  } catch (error) {
    console.error('Erro durante Google authentication:', error);
    return NextResponse.redirect('/login');
  }
}
