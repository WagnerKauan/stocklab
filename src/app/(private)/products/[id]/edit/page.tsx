'use server';
import { CardMain } from '@/components/layout/cardMain';
import { FormProduct } from '@/components/product/formProduct';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { findProductByIdChached } from '@/lib/queries/product';
import { sortVariants } from '@/utils/sizeOrder';
import { redirect } from 'next/navigation';

export default async function ProductEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) return redirect('/login');

  const { id } = await params;

  const product = await findProductByIdChached({
    id,
    userId: user.id,
  });

  if (!product) {
    return <CardMain>Product not found</CardMain>;
  }

  product.variants = sortVariants(product.variants);

  return (
    <CardMain>
      <FormProduct initialData={product} />
    </CardMain>
  );
}
