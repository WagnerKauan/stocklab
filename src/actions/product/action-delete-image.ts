"use server";



import { getCurrentUser } from "@/lib/auth/get-current-user";
import { utapi } from "@/lib/uploadThing-server";


export async function actionDeleteImage(imageKey: string) {
  const user = await getCurrentUser();

  if(!user) return {
    error: 'Erro ao deletar a imagem usuario nao encontrado'
  }

  if(!imageKey) return {
    error: 'Erro ao deletar a imagem propriedade imageKey nao encontrada'
  }
  
  try {

    await utapi.deleteFiles(imageKey)

    return {
      message: 'Imagem deletada com sucesso'
    }

  }catch(error) {
    console.error(error)
    return {
      error: 'Erro ao deletar a imagem'
    }
  }
}