import type { User } from "../../../generated/prisma/client";



export interface UserRepository {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User | null>
}