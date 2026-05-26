import { SyncVariants, ProductModel } from '@/models/product/product-model';
import { ProductData } from '@/models/product/product-model';

export interface ProductRepository {
  findAll(userId: string): Promise<ProductModel[]>;
  findById(id: string, userId: string): Promise<ProductModel | null>;

  create(product: ProductData & { userId: string }): Promise<boolean>;

  update(product: ProductModel): Promise<boolean>;

  syncVariants(variants: SyncVariants): Promise<boolean>;
}
