import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';

async function backup() {
  const products = await prisma.product.findMany();

  const variants = await prisma.variant.findMany();

  const data = {
    products,
    variants,
  };

  await fs.writeFile('./backup.json', JSON.stringify(data, null, 2));

  console.log('backup criado');
}

async function restore(userId: string) {
  const raw = await fs.readFile('./backup.json', 'utf8');

  if(!raw) {
    throw new Error('Backup file not found');
  }

  const data = JSON.parse(raw);

  // await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.variant.deleteMany();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  for (const product of data.products) {
    const { name, productImage, category, typeProduct, imageKey } = product;
    const createdProduct = await prisma.product.create({
      data: {
        name,
        productImage,
        category,
        typeProduct,
        imageKey,
        userId,
      },
    });

    for (const variant of data.variants) {
      const { productId, size, color, stock, priceInCents, sku } = variant;

      if (productId === product.id) {
        await prisma.$transaction(async tx => {
          await tx.variant.create({
            data: {
              productId: createdProduct.id,
              size,
              color,
              stock,
              priceInCents,
              sku,
            },
          });
        });
      }
    }
  }

  console.log('backup restaurado');
}

restore('teste');

async function initialDB(userId: string, securyKey: string) {
  if (securyKey !== 'reiniciar banco de dados') {
    throw new Error('Chave de segurança inválida');
  }

  await backup();
  await restore(userId);
  console.log('DB inicializada');
}

export { initialDB };
