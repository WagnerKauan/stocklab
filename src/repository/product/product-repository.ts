import { ProductModel } from '@/models/product/product-model';

export interface ProductRepository {
  findAll(): Promise<ProductModel[]>;
  findById(id: string): Promise<ProductModel | null>;

  create(product: ProductModel & { userId: string }): Promise<boolean>
}
