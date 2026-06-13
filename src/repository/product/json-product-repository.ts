import { ProductModel, SyncVariants } from '@/models/product/product-model';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { ProductRepository } from './product-repository';
import { ProductData } from '@/models/product/product-model';
import { Product } from '../../../generated/prisma/client';

const ROOT_DIR = process.cwd();
const JSON_PRODUCTS_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'products.json',
);

export class JsonProductRepository implements ProductRepository {
  private async readFromDisk(): Promise<ProductModel[]> {
    const jsonContent = await readFile(JSON_PRODUCTS_PATH, 'utf-8');
    const parsedJson = JSON.parse(jsonContent);
    const { products } = parsedJson;
    return products;
  }

  async findAll(): Promise<ProductModel[]> {
    const products = await this.readFromDisk();
    return products;
  }

  async findById({ id }: { id: string }): Promise<ProductModel | null> {
    const products = await this.readFromDisk();
    const product = products.find(p => p.id === id) || null;
    return product;
  }

  create(product: ProductData & { userId: string }): Promise<Product | null> {
    throw new Error('Method not implemented.');
  }

  syncVariants(variants: SyncVariants): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  update(product: ProductModel): Promise<Product | null> {
    throw new Error('Method not implemented.');
  }
  
}
