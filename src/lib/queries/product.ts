import { SyncVariants, ProductModel } from "@/models/product/product-model";
import { productRepository } from "@/repository/product";
import { cache } from "react";


type ProductData = Omit<ProductModel, 'id'>


export const findAllProductsChached = cache(
  async () => {
    return await productRepository.findAll()
  }
)


export const findProductByIdChached = cache(
  async (id: string) => {
    return await productRepository.findById(id)
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

