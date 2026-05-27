import { UserData } from "@/models/user/user-model";
import type { Account, User } from "../../../generated/prisma/client";
import { CreateAccountParams, FindAccountById } from "@/models/queries/queries";



export interface UserRepository {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: UserData): Promise<User>
  findAccountByid({provider, providerAccountId}: FindAccountById): Promise<Account | null>
  createAccount({userId, provider, providerAccountId}: CreateAccountParams): Promise<Account>
}