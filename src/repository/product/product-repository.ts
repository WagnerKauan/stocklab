import { SyncVariants, ProductModel } from '@/models/product/product-model';
import { ProductData } from '@/models/product/product-model';
import { Product } from '../../../generated/prisma/client';

export interface ProductRepository {
  findAll(userId: string): Promise<ProductModel[]>;
  findById(id: string, userId: string): Promise<ProductModel | null>;

  create(product: ProductData & { userId: string }): Promise<Product | null>;

  update(product: ProductModel): Promise<Product | null>;

  syncVariants(variants: SyncVariants): Promise<boolean>;
}
