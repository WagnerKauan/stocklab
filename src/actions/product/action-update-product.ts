import { findProductByIdChached } from "@/lib/queries/product";
import { ProductModel } from "@/models/product/product-model";

/*
  PRECISO TRABALHAR NA LÓGICA DE CREATE,UPDATE E DELETE COMO IDENTIFICAR AS VARIANTS QUE SÃO DE EDIÇÃO, CRIAÇÃO OU DELETAR

  1- preciso pegar todas as variações que já existem daquele produto no banco de dados
  2- comparar as variações que veio do front com as que veio do banco de dados
  3- se houver alguma variante que não exista no banco de dados preciso criar ela
  4- se houver alguma variante que exista no banco de dados preciso atualizar ela
  5- se houver alguma variante que nao exista no front mas exista no banco de dados preciso deletar ela
*/


export async function actionUpdateProduct(data: ProductModel) {


  const { variants, ...productData } = data;


  const productDB = await findProductByIdChached(productData.id);

  if(!productDB) {
    return {
      status: false,
      errors: ['Produto nao encontrado'],
      code: 404
    }
  }

  const variantsDB = productDB.variants;

  // Percorro as variações do front e verifico se elas existem no banco de dados se exister ignora se não crio a variante
  const variantsToCreate = variants.filter(variant => !variantsDB.some(variantDB => variantDB.id === variant.id ))

  //Percorro as variações do front e verifico se elas existem no banco de dados se exister eu atualizo se não ignoro
  const variantsToUpdate = variants.filter(variant => variantsDB.some(variantDB => variantDB.id === variant.id))

  //Percorro as variações do banco de dados e verifico se elas existem no front se não existir eu deleto
  const variantsToDelete = variantsDB.filter(variantDB => !variants.some(variant => variant.id === variantDB.id))
}
