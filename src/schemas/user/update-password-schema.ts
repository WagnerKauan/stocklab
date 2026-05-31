import { z } from 'zod';


export const updatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .max(100, 'A senha deve ter no máximo 100 caracteres').optional(),
  
  newPassword: z
    .string()
    .min(6, 'A senha precisa ter no mínimo 6 caracteres')
    .max(100, 'A senha deve ter no.maxcdn 100 caracteres'),
  
  confirmPassword: z
    .string()
    .min(6, 'A senha precisa ter no mínimo 6 caracteres')
    .max(100, 'A senha deve ter no.maxcdn 100 caracteres'),
})


