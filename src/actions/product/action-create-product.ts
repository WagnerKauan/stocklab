'use server';

import { ErrorInput } from '@/components/product/formProduct';
import { createProduct } from '@/lib/queries/product';
import type { ProductModel } from '@/models/product/product-model';
import { productSchema } from '@/schemas/product/product.schema';
import { variantSchema } from '@/schemas/product/variant.schema';

/*
  PRECISO TRABALHAR NA LÓGICA DE CREATE,UPDATE E DELETE COMO IDENTIFICAR AS VARIANTS QUE SÃO DE EDIÇÃO, CRIAÇÃO OU DELETAR

  1- preciso pegar todas as variações que já existem daquele produto no banco de dados
  2- comparar as variações que veio do front com as que veio do banco de dados
  3- se houver alguma variante que não exista no banco de dados preciso criar ela
  4- se houver alguma variante que exista no banco de dados preciso atualizar ela
  5- se houver alguma variante que nao exista no front mas exista no banco de dados preciso deletar ela
*/

type productData = Omit<ProductModel, 'id'>;

export async function actionCreateProduct(data: productData) {

  const { variants, ...product } = { ...data };

  const errorsProduct =
    productSchema
      .safeParse(product)
      .error?.issues.reduce<ErrorInput[]>((errs, issue) => {
        errs.push({
          message: issue.message,
          field: issue.path[0].toString(),
        });
        return errs;
      }, []) || [];

  const errorsVariants = variants.reduce<ErrorInput[]>((errs, variant) => {
    const variantValid = variantSchema.safeParse(variant);
    if (!variantValid.success) {
      variantValid.error.issues.forEach(issue => {
        errs.push({
          id: variant.id,
          message: issue.message,
          field: issue.path[0].toString(),
        });
      });
    }

    return errs;
  }, []);


  if (errorsProduct.length > 0 || errorsVariants.length > 0) {
    return {
      status: false,
      errors: [...errorsProduct, ...errorsVariants],
      code: 400,
    }
  }


  const result = await createProduct({ ...product, variants, userId: 'teste123' });

  if(!result) {
    return {
      status: false,
      errors: [],
      code: 500
    }
  }

  return {
    status: true,
    errors: [],
    code: 200
  }
}
