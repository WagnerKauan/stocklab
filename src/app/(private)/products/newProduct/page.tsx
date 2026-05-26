"use server";
import { CardMain } from '@/components/layout/cardMain';
import { FormProduct } from '@/components/product/formProduct';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { redirect } from 'next/navigation';

export default async function NewProduct() {
  const user = await getCurrentUser();

  if(!user) return redirect('/login');

  return (
    <CardMain>
      <FormProduct />
    </CardMain>
  );
}
