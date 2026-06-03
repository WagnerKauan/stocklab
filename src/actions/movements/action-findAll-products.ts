"use server";



import { getCurrentUser } from '@/lib/auth/get-current-user';
import { findAllProductsChached } from '@/lib/queries/product';
import { redirect } from 'next/navigation';



export async function actionFindAllProducts() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  const response = await findAllProductsChached(user.id);
  return response;
}