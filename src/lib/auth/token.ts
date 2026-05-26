"use server";

import jwt from 'jsonwebtoken';

type TokenPayload = {
   userId: string;
};

export async function createToken(userId: string) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  return token;
}

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as TokenPayload;
  } catch (error) {
    console.error(error);
    return false;
  }
}