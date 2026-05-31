import { updateAvatarProps } from '@/models/queries/queries';
import { profileRepository } from '@/repository/profile';

export const updateAvatar = async ({
  userId,
  imageKey,
  imageUrl,
}: updateAvatarProps) => {
  return await profileRepository.updateAvatar({ userId, imageKey, imageUrl });
};

export const updateName = async ({
  userId,
  name,
}: {
  userId: string;
  name: string;
}) => {
  return await profileRepository.updateName({ userId, name });
};

export const updatePassword = async ({
  userId,
  newPassword,
}: {
  userId: string;
  newPassword: string;
}) => {
  return await profileRepository.updatePassword({
    userId,
    newPassword,
  });
};
