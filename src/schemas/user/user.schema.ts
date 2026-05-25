import { email, z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome é obrigatório')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  email: email('O email é inválido')
    .min(1, 'O email é obrigatório')
    .max(100, 'O email deve ter no máximo 100 caracteres'),
  password: z
    .string()
    .min(1, 'A senha é obrigatória')
    .max(100, 'A senha deve ter no máximo 100 caracteres'),
});
