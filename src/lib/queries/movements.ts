import { movementsRepository } from "@/repository/movements";



export const findAllMovements = async ({ userId }: { userId: string }) => {
  return movementsRepository.findAll({ userId });
}