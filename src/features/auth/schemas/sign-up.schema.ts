import { z } from 'zod'
import { signInSchema } from './sign-in.schema'

export const signUpSchema = signInSchema.extend({
  fullname: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long'),
})

export type SignUpValues = z.infer<typeof signUpSchema>
