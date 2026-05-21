import { createUploadthing, type FileRouter } from 'uploadthing/next';

/*
  O que isso faz mentalmente:

  f => é tipo uma maquininha que vai criar uma rota para o upload de imagens

  onUploadComplete => quando o upload for concluido ele vai executar essa funcao e vai retornar o url da imagem para o front

rota:
productImage

aceita:
imagem

limite:
5MB

máximo:
1 arquivo

*/

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log('upload feito', file.ufsUrl);

    return {
      productImage: file.ufsUrl,
    };
  }),


  //Pode ter varias imagens
  // userAvatar: f({
  //   image: {
  //     maxFileSize: '4MB',
  //     maxFileCount: 1,
  //   },
  // }).onUploadComplete(async ({ file }) => {

  //   return ({
  //     userAvatar: file.ufsUrl,
  // })
  // })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
