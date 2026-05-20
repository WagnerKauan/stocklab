'use server';

import { createProduct } from '@/lib/queries/product';
import type { ProductData } from '@/models/product/product-model';
import { validateProduct } from '@/validation/product';
/*
  PRECISO TRABALHAR NA LÓGICA DE CREATE,UPDATE E DELETE COMO IDENTIFICAR AS VARIANTS QUE SÃO DE EDIÇÃO, CRIAÇÃO OU DELETAR

  1- preciso pegar todas as variações que já existem daquele produto no banco de dados
  2- comparar as variações que veio do front com as que veio do banco de dados
  3- se houver alguma variante que não exista no banco de dados preciso criar ela
  4- se houver alguma variante que exista no banco de dados preciso atualizar ela
  5- se houver alguma variante que nao exista no front mas exista no banco de dados preciso deletar ela
*/

export async function actionCreateProduct(data: ProductData) {
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

  const result = await createProduct({
    ...product,
    variants,
    userId: 'teste123',
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
  };
}
