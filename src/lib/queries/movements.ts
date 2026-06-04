import { MovementData } from "@/models/movements/movements-model";
import { movementsRepository } from "@/repository/movements";



export const findAllMovements = async ({ userId }: { userId: string }) => {
  return movementsRepository.findAll({ userId });
}

export const createMovement = async (movement: MovementData & { userId: string }) => {
  return movementsRepository.create({ movement });
}