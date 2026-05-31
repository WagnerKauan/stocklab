'use server';

import { getCurrentUser } from '@/lib/auth/get-current-user';
import { updateAvatar, updateName } from '@/lib/queries/profile';
import { utapi } from '@/lib/uploadThing-server';
import { ErrorsInput } from '@/models/global/global';
import { userSchema } from '@/schemas/user/user.schema';

export async function actionUpdateName({ name }: { name: string }) {
  const user = await getCurrentUser();

  if (!user)
    return {
      errors: [
        {
          message: 'Usuário não encontrado',
          field: 'secret',
        },
      ],
    };

  const validName = userSchema.shape.name.safeParse(name);

  if (!validName.success) {
    const errors = validName.error.issues.reduce<ErrorsInput[]>(
      (errs, issue) => {
        errs.push({
          message: issue.message,
          field: issue.path[0] as string,
        });
        return errs;
      },
      [],
    );

    return {
      errors,
    };
  }

  const response = await updateName({ userId: user.id, name });

  if (!response)
    return {
      errors: [
        {
          message: 'Erro ao atualizar o nome',
          field: 'secret',
        },
      ],
    };

  return { 
    status: true,
    message: 'Nome atualizado com sucesso' 
  };
}
