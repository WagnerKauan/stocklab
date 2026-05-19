import { ProductModel } from '@/models/product/product-model';
import { ProductRepository } from './product-repository';
import { prisma } from '@/lib/prisma';

type ProductData = Omit<ProductModel, 'id'>;

export class SqliteProductRepository implements ProductRepository {
  async findAll(): Promise<ProductModel[]> {
    const products = await prisma.product.findMany({
      include: {
        variants: true,
      },
    });

    return products;
  }

  async findById(id: string): Promise<ProductModel | null> {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        variants: true,
      },
    });

    return product;
  }

  async create(data: ProductData & { userId: string }): Promise<boolean> {
    const { variants, userId, ...productData } = data;

    try {
      const result = await prisma.product.create({
        data: {
          ...productData,

          user: {
            connect: {
              id: userId,
            },
          },

          variants: {
            create: variants.map(v => ({
              priceInCents: v.priceInCents,
              stock: v.stock,
              color: v.color,
              size: v.size,
              sku: v.sku,
            })),
          },
        },
      });

      return !!result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
