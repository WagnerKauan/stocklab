import { MovementModel } from "@/models/movements/movements-model";




export interface Movements {
  findAll({ userId }: { userId: string }): Promise<MovementModel[]>;
}