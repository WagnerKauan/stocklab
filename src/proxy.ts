import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const isAuthPage =
    req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register';

  if(!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if(token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  try {
    if(token) {
      jwt.verify(token, process.env.JWT_SECRET!);
    }

    return NextResponse.next();
  }catch(error){
    return NextResponse.redirect(new URL ("/login", req.url));
  }
}


export const config = {
  matcher:[
    "/dashboard/:path*",
    "/products/:path*",
    "/profile/:path*",
    "/login",
    "/register"
  ]
}
