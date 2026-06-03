import { prisma } from '@/lib/prisma';
import { StockMovement } from '../../../generated/prisma/client';
import { Movements } from './movements-repository';
import { MovementModel } from '@/models/movements/movements-model';

export class SqliteMovementsRepository implements Movements {
  async findAll({ userId }: { userId: string }): Promise<MovementModel[]> {
    return prisma.stockMovement.findMany({
      where: {
        userId
      }, 
      include: {
        product: true,
        variant: true
      }
    })
  }
}
