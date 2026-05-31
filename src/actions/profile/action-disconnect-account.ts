"use server";

import { getCurrentUser } from "@/lib/auth/get-current-user";
import { Account } from "../../../generated/prisma/client";
import { disconnectAccount, findAccountById } from "@/lib/queries/user";
import { revalidatePath } from "next/cache";




export async function actionDisconnectAccount(account: Account) {

  const user = await getCurrentUser();

  if(!user) return { error: 'Usuario nao encontrado' };

  if(!user.password) return { error: 'Usuario não possui senha' };

  const existAccount = await findAccountById({
    provider: account.provider,
    providerAccountId: account.providerAccountId,
  })

  if(!existAccount) return { error: 'Conta nao encontrada' };

  if(existAccount.userId !== user.id) return { error: 'Conta nao pertence ao usuario' };


  const response = await disconnectAccount({
    provider: account.provider,
    providerAccountId: account.providerAccountId,
  });

  if(!response) return { error: 'Erro ao desconectar a conta' };

  revalidatePath('/profile');

  return { message: 'Conta desconectada com sucesso' };
}