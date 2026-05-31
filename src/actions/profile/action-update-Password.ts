'use server';

import { ErrorInput } from '@/components/product/formProduct';
import { compareHash, createHash } from '@/lib/auth/bcrypt';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { updatePassword } from '@/lib/queries/profile';
import { updatePasswordSchema } from '@/schemas/user/update-password-schema';

type ActionUpdatePasswordProps = {
  currentPassword: string | null;
  newPassword: string;
  confirmPassword: string;
};

export async function actionUpdatePassword({
  currentPassword,
  newPassword,
  confirmPassword,
}: ActionUpdatePasswordProps) {
  const user = await getCurrentUser();

  if (!user)
    return { errors: [{ message: 'Usuário não encontrado', field: 'secret' }] };

  if (newPassword !== confirmPassword)
    return {
      errors: [{ message: 'As senhas não coincidem', field: 'newPassword' }],
    };

  const validPassword = updatePasswordSchema.safeParse({
    currentPassword,
    newPassword,
    confirmPassword,
  });

  if (!validPassword.success) {
    const errors = validPassword.error.issues.reduce<ErrorInput[]>(
      (errs, issue) => {
        errs.push({
          message: issue.message,
          field: issue.path[0].toString() as string,
        });
        return errs;
      },
      [],
    );

    return { errors };
  }

  if (currentPassword && user.password) {
    const validCurrentPassword = await compareHash(
      currentPassword,
      user.password,
    );

    if (!validCurrentPassword)
      return {
        errors: [
          { message: 'Senha atual incorreta', field: 'currentPassword' },
        ],
      };
  }

  const hashPassword = await createHash(newPassword);

  const response = await updatePassword({
    userId: user.id,
    newPassword: hashPassword,
  });

  if (!response)
    return {
      errors: [{ message: 'Erro ao atualizar a senha', field: 'secret' }],
    };

  return {
    status: true,
    message: 'Senha atualizada com sucesso',
  };
}
