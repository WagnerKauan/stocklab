import { updateAvatarProps } from '@/models/queries/queries';
import { ProfileRepository } from './repository-profile';
import { prisma } from '@/lib/prisma';

export class SqliteProfileRepository implements ProfileRepository {
  async updateAvatar({
    userId,
    imageKey,
    imageUrl,
  }: updateAvatarProps): Promise<boolean> {
    try {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          imageKey: imageKey,
          image: imageUrl,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateName({
    userId,
    name,
  }: {
    userId: string;
    name: string;
  }): Promise<boolean> {
    try {
      const result = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updatePassword({
    userId,
    newPassword,
  }: {
    userId: string;
    newPassword: string;
  }): Promise<boolean> {
    try {
      const result = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: newPassword,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
