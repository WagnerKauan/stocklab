import { JsonProductRepository } from "./json-product-repository";
import { ProductRepository } from "./product-repository";


export const productRepository: ProductRepository = new JsonProductRepository();