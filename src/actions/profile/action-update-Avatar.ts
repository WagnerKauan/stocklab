'use server';

import { getCurrentUser } from '@/lib/auth/get-current-user';
import { updateAvatar } from '@/lib/queries/profile';
import { utapi } from '@/lib/uploadThing-server';

type ActionUpdateAvatarProps = {
  newImageUrl: string;
  newImageKey: string;
};

export async function actionUpdateAvatar({
  newImageKey,
  newImageUrl,
}: ActionUpdateAvatarProps) {
  const user = await getCurrentUser();

  if (!user) return { error: 'Usuario nao encontrado' };

  try {
    if (user.imageKey) {
      await utapi.deleteFiles(user.imageKey);
    }

    const response = await updateAvatar({
      userId: user.id,
      imageKey: newImageKey,
      imageUrl: newImageUrl,
    });

    if (!response) return { error: 'Erro ao atualizar o avatar' };

    return { message: 'Avatar atualizado com sucesso' };
  } catch (error) {
    console.error(error);
    return { error: 'Erro ao atualizar o avatar' };
  }
}
