import { User } from "../../../generated/prisma/client";
import { UserRepository } from "./user-repository";
import { prisma } from "@/lib/prisma";




export class SqliteUserRepository implements UserRepository {

  findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id: id
      }
    })
  }

  findAll(): Promise<User[]> {
    return prisma.user.findMany()
  }
} 