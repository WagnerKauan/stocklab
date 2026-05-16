import { z } from 'zod';

export const userSettingsSchema = z.object({
  theme: z.enum(['dark', 'light']).optional(),
  lowStockAlert: z
    .number()
    .min(1, 'O alerta de estoque deve ser maior que zero')
    .max(100, 'O alerta de estoque deve ser menor ou igual a 100')
    .optional(),
  lowVarientAlert: z
    .number()
    .min(1, 'O alerta de variação deve ser maior que zero')
    .max(100, 'O alerta de variação deve ser menor ou igual a 100')
    .optional(),
});
