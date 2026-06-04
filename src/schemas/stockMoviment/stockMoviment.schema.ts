

import { z } from 'zod';

export const stockMovementSchema = z.object({
  productId: z.string().nonempty('Escolha um produto para movimentar'),
  variantId: z.string().nonempty('Escolha uma variante para movimentar'),
  type: z.enum(['IN', 'OUT'], 'Escolha um tipo de movimentação'),
  quantity: z
    .number()
    .min(1, 'O quantidade deve ser maior que zero')
    .max(1000, 'O quantidade deve ser menor ou igual a 1000'),
});


