import { UserData } from '@/models/user/user-model';
import { User } from '../../../generated/prisma/client';
import { UserRepository } from './user-repository';
import { prisma } from '@/lib/prisma';

export class SqliteUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        userSettings: true,
      },
      
    }) as User | null;
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        userSettings: true,
      },
    }) as unknown as User[];
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        userSettings: true,
      },
    }) as User | null;
  }

  async create(user: UserData): Promise<User> {
    return await prisma.user.create({
      data: user,
    });
  }
}
