'use server';

import { getCurrentUser } from '@/lib/auth/get-current-user';
import { createProduct } from '@/lib/queries/product';
import type { ProductData } from '@/models/product/product-model';
import { sanitizeProduct } from '@/utils/sanitazeProduct';
import { validateProduct } from '@/validation/product';
import { redirect } from 'next/navigation';

export async function actionCreateProduct(data: ProductData) {
  
  const user = await getCurrentUser();

  if(!user) return redirect('/login');

  const { variants, ...product } = { ...data };

  const { errorsProduct, errorsVariants } = validateProduct({
    ...product,
    variants,
  });

  if (errorsProduct.length > 0 || errorsVariants.length > 0) {
    return {
      status: false,
      errors: [...errorsProduct, ...errorsVariants],
      code: 400,
    };
  }

  const sanitazedProduct = sanitizeProduct({ ...product, variants }, 'DB');

  const result = await createProduct({
    ...sanitazedProduct,
    userId: user.id,
  });

  if (!result) {
    return {
      status: false,
      errors: [],
      code: 500,
    };
  }

  return {
    status: true,
    errors: [],
    code: 200,
    data: result,
  };
}
