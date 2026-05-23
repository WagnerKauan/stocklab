"use server";

import { findProductByIdChached, syncVariants, updateProduct } from "@/lib/queries/product";
import { ProductModel } from "@/models/product/product-model";
import { sanitizeProduct } from "@/utils/sanitazeProduct";
import { validateProduct } from "@/validation/product";


/*
  preciso futuramente quando o produto for buscado no banco de dados preciso confirmar com o userId se aquele produto é do usuario logado
  preciso colocar dentro do $transaction o updateProduct e o syncVariants
*/

export async function actionUpdateProduct(data: ProductModel) {


  const { variants, ...productData } = data;


  const { errorsProduct, errorsVariants } = validateProduct({ ...productData, variants });

  if(errorsProduct.length > 0 || errorsVariants.length > 0) {
    return {
      status: false,
      errors: [...errorsProduct, ...errorsVariants],
      code: 400,
    }
  }

  const productDB = await findProductByIdChached(productData.id);

  if(!productDB) {
    return {
      status: false,
      errors: [],
      code: 404
    }
  }

  const sanitazedProduct = sanitizeProduct({ ...productData, variants }, 'DB');

  const variantsDB = productDB.variants;

  // Percorro as variações do front e verifico se elas existem no banco de dados se exister ignora se não crio a variante
  const variantsToCreate = sanitazedProduct.variants.filter(variant => !variantsDB.some(variantDB => variantDB.id === variant.id ))

  //Percorro as variações do front e verifico se elas existem no banco de dados se exister eu atualizo se não ignoro
  const variantsToUpdate = sanitazedProduct.variants.filter(variant => variantsDB.some(variantDB => variantDB.id === variant.id))

  //Percorro as variações do banco de dados e verifico se elas existem no front se não existir eu deleto
  const variantsToDelete = variantsDB.filter(variantDB => !sanitazedProduct.variants.some(variant => variant.id === variantDB.id))

  const variantsToSync = {
    productId: productDB.id,
    toCreate: variantsToCreate,
    toUpdate: variantsToUpdate,
    toDelete: variantsToDelete,
  }

  const resultUpdateProduct = await updateProduct({ ...sanitazedProduct, id: productDB.id });
  const resultSyncVariants = await syncVariants(variantsToSync);

  return {
    status: resultUpdateProduct && resultSyncVariants,
    errors: [],
    code: resultUpdateProduct && resultSyncVariants ? 200 : 500,
  }
}
