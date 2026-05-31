import { SyncVariants, ProductModel } from '@/models/product/product-model';
import { ProductRepository } from './product-repository';
import { prisma } from '@/lib/prisma';
import { Product } from '../../../generated/prisma/client';

type ProductData = Omit<ProductModel, 'id'>;

export class SqliteProductRepository implements ProductRepository {
  async findAll(userId: string): Promise<ProductModel[]> {
    const products = await prisma.product.findMany({
      where: {
        userId: userId,
      },
      include: {
        variants: true,
      },
    });

    return products;
  }

  async findById(id: string, userId: string): Promise<ProductModel | null> {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        variants: true,
      },
    });

    return product;
  }

  async create(
    data: ProductData & { userId: string },
  ): Promise<Product | null> {
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

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(product: ProductModel): Promise<Product | null> {
    const { variants, id, ...productData } = product;

    try {
      const result = await prisma.product.update({
        where: {
          id: id,
        },
        data: {
          ...productData,
        },
      });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async syncVariants(variants: SyncVariants): Promise<boolean> {
    const { productId, toCreate, toUpdate, toDelete } = variants;

    try {
      const result = await prisma.$transaction(async tx => {
        if (toCreate.length > 0) {
          await tx.variant.createMany({
            data: toCreate.map(v => ({
              priceInCents: v.priceInCents,
              stock: v.stock,
              color: v.color,
              size: v.size,
              sku: v.sku,
              productId: productId,
            })),
          });
        }

        if (toUpdate.length > 0) {
          await Promise.all(
            toUpdate.map(v =>
              tx.variant.update({
                where: {
                  id: v.id,
                  productId: productId,
                },
                data: {
                  priceInCents: v.priceInCents,
                  stock: v.stock,
                  color: v.color,
                  size: v.size,
                  sku: v.sku,
                },
              }),
            ),
          );
        }

        if (toDelete.length > 0) {
          await tx.variant.deleteMany({
            where: {
              id: {
                in: toDelete.map(v => v.id),
              },

              productId: productId,
            },
          });
        }
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
