
import { z } from "zod";


export const variantSchema = z.object({
  size: z.string().max(100, 'O tamanho da variação deve ter no máximo 100 caracteres').optional(),
  color: z.string().max(100, 'A cor da variação deve ter no máximo 100 caracteres').optional(),
  stock: z.number().min(1, 'O estoque da variação deve ser maior que zero'),
  priceInCents: z.number().min(1, 'O preço da variação deve ser maior que zero'),
  sku: z.string().max(100, 'O sku da variação deve ter no máximo 100 caracteres').optional(),
})


export type Variant = z.infer<typeof variantSchema>;