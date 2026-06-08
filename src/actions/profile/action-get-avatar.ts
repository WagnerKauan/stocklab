"use server";

import { getCurrentUser } from "@/lib/auth/get-current-user";




export async function actionGetAvatarUrl() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return user.image;
}