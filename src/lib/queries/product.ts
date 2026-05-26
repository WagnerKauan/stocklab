import { SyncVariants, ProductModel } from "@/models/product/product-model";
import { productRepository } from "@/repository/product";
import { sanitizeProduct } from "@/utils/sanitazeProduct";
import { cache } from "react";


type ProductData = Omit<ProductModel, 'id'>


export const findAllProductsChached = cache(
  async (userId: string) => {
    const products = await productRepository.findAll(userId);

    return products.map(product => sanitizeProduct(product, 'FRONT') as ProductModel)
  }
)


export const findProductByIdChached = cache(
  async (id: string, userId: string) => {
    const product = await productRepository.findById(id, userId);
    if(!product) return null
    return sanitizeProduct(product, 'FRONT')  as ProductModel
  }
)


export const createProduct = async (data: ProductData & {userId: string}) => {
  return await productRepository.create(data)
}


export const updateProduct = async (data: ProductModel) => {
  return await productRepository.update(data)
}

export const syncVariants = async (variants: SyncVariants) => {
  return await productRepository.syncVariants(variants)
}

