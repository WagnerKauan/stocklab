import { JsonProductRepository } from "./json-product-repository";
import { ProductRepository } from "./product-repository";
import { SqliteProductRepository } from "./sqlite-product-repository";


export const productRepository: ProductRepository = new SqliteProductRepository();