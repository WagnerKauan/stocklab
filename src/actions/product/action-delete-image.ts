"use server";



import { utapi } from "@/lib/uploadThing-server";


export async function actionDeleteImage(imageKey: string) {

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