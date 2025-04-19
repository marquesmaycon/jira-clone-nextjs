import { z } from "zod"

export const signInSchema = z.object({
   email: z.string().email({ message: "E-mail inválido" }),
   password: z.string().min(1, { message: "Obrigatório" })
})

export type SignInSchema = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
   name: z.string().min(3, { message: "Obrigatório" }),
   email: z.string().email({ message: "E-mail inválido" }),
   password: z.string().min(8, { message: "Senha deve ter pelo menos 8 caracteres" })
})

export type SignUpSchema = z.infer<typeof signUpSchema>