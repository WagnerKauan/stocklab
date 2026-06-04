import { prisma } from './prisma';






async function teste() {
  await prisma.stockMovement.deleteMany();

  console.log('ok');
}

teste();
