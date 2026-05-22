
import { z } from 'zod';



export const productSchema = z.object({
  name: z.string().min(1, 'O nome do produto é obrigatório').max(100, 'O nome do produto deve ter no máximo 100 caracteres'),
  category: z.enum(['roupas','calcados', 'acessorios'], "Categoria inválida"),
  typeProduct: z.string().min(1, 'O tipo do produto é obrigatório').max(100, 'O tipo do produto deve ter no máximo 100 caracteres'),
  productImage: z.string().max(200, 'A imagem do produto deve ter no máximo 200 caracteres').optional(),
  imageKey: z.string().max(200, 'A chave da imagem do produto deve ter no.maxcdn 200 caracteres').optional(),
})


export type Product = z.infer<typeof productSchema>;