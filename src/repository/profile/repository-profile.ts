import { updateAvatarProps } from "@/models/queries/queries";





export interface ProfileRepository {

  updateAvatar({userId, imageKey, imageUrl}: updateAvatarProps): Promise<boolean>
  updateName({userId, name}: {userId: string, name: string}): Promise<boolean>
  updatePassword({userId, newPassword}: {userId: string, newPassword: string}): Promise<boolean>
}