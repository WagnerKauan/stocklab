import { UserData } from '@/models/user/user-model';
import { Account, User } from '../../../generated/prisma/client';
import { CreateAccountParams, FindAccountById, } from '@/models/queries/queries';
import { UserRepository } from './user-repository';
import { prisma } from '@/lib/prisma';

export class SqliteUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async create(user: UserData): Promise<User> {
    return await prisma.user.create({
      data: user,
    });
  }

  async findAccountByid({provider, providerAccountId,}: FindAccountById): Promise<Account | null> {
    return await prisma.account.findUnique({
      where: {
       provider_providerAccountId: {
          provider: provider,
          providerAccountId: providerAccountId,
       }
      }
    })
  }

  async findAccountByUserId(userId: string): Promise<Account | null> {
    return await prisma.account.findFirst({
      where: {
        userId: userId
      }
    })
  }

  async createAccount({userId, provider, providerAccountId, googleEmail}: CreateAccountParams): Promise<Account> {
    return await prisma.account.create({
      data: {
        userId: userId,
        provider: provider,
        providerAccountId: providerAccountId,
        googleEmail: googleEmail
      }
    })
  }

  async disconnectAccount({ provider, providerAccountId }: FindAccountById): Promise<boolean> {
    try {
      await prisma.account.delete({
        where: {
          provider_providerAccountId: {
            provider: provider,
            providerAccountId: providerAccountId,
          }
        }
      })
      return true
    }catch (error) {
      console.error(error);
      return false
    } 
  }
}
