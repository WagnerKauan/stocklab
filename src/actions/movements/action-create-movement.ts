'use server';

import { getCurrentUser } from '@/lib/auth/get-current-user';
import { createMovement } from '@/lib/queries/movements';
import { findProductByIdChached, syncVariants } from '@/lib/queries/product';
import { MovementData } from '@/models/movements/movements-model';
import { validateMovement } from '@/validation/movement';
import { revalidatePath } from 'next/cache';

export async function actionCreateMovement(data: MovementData) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const validationErrors = validateMovement(data);

  if (validationErrors.length > 0) {
    return {
      success: false,
      errors: validationErrors,
      code: 400,
    };
  }


  const existProduct = await findProductByIdChached({
    id: data.productId,
    userId: user.id,
  });

  if (!existProduct) {
    return {
      success: false,
      errors: [
        {
          message: 'Produto não encontrado',
          field: 'productId',
        },
      ],
      code: 400,
    };
  }

  const existVariant = existProduct.variants.find(
    variant => variant.id === data.variantId,
  );

  if (!existVariant) {
    return {
      success: false,
      errors: [
        {
          message: 'Variante não encontrada',
          field: 'variantId',
        },
      ],
      code: 400,
    };
  }

  if (data.type === 'OUT' && existVariant.stock < data.quantity) {
    return {
      success: false,
      errors: [
        {
          message: 'Estoque insuficiente',
          field: 'quantity',
        },
      ],
      code: 400,
    };
  }

  switch(data.type) {
    case 'IN':
      existVariant.stock += data.quantity;
      break;
    case 'OUT':
      existVariant.stock -= data.quantity;
      break;
  }
  

    const variantsToSync = {
    productId: existProduct.id,
    toCreate: [],
    toUpdate: [existVariant],
    toDelete: [],
  }
  
  const result = await syncVariants(variantsToSync);

  if(!result) {
    return {
      success: false,
      errors: [
        {
          message: 'Erro ao sincronizar variante',
          field: 'variantId',
        },
      ],
      code: 400,
    };
  }
  await createMovement({ ...data, userId: user.id });

  revalidatePath('/movements');
  return {
    success: true,
    errors: [],
    code: 200,
  };
}
