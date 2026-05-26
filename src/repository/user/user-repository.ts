import { UserData } from "@/models/user/user-model";
import type { User } from "../../../generated/prisma/client";



export interface UserRepository {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: UserData): Promise<User>
}