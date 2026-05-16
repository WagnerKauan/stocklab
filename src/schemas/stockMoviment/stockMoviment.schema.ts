'use server';

import { z } from 'zod';

export const stockMovimentSchema = z.object({
  type: z.enum(['IN', 'OUT']),
  quantity: z
    .number()
    .min(1, 'O quantidade deve ser maior que zero')
    .max(1000, 'O quantidade deve ser menor ou igual a 1000'),
});
