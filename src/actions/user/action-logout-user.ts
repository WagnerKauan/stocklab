"use server"

import { removeAuthCookie } from "@/lib/auth/cookies";
import { redirect } from "next/navigation";





export async function actionLogoutUser() {

  await removeAuthCookie();

  redirect('/login');
}