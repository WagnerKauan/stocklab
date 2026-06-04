import { MovementData, MovementModel } from "@/models/movements/movements-model";




export interface Movements {
  findAll({ userId }: { userId: string }): Promise<MovementModel[]>;
  create({ movement }: { movement: MovementData & { userId: string } }): Promise<boolean>;
}