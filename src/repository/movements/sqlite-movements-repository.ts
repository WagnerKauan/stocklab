import { prisma } from '@/lib/prisma';
import { StockMovement } from '../../../generated/prisma/client';
import { Movements } from './movements-repository';
import { MovementData, MovementModel } from '@/models/movements/movements-model';

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

  async create({ movement }: { movement: MovementData & { userId: string; }; }): Promise<boolean> {
    try {
      await prisma.stockMovement.create({
        data: movement
      });
      return true;
    } catch (error) {
      console.error('Error creating movement:', error);
      return false;
    }
  }
}
