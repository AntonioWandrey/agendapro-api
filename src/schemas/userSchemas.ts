// src/schemas/userSchemas.ts
import { z } from 'zod';

export const newUserSchema = z.object({
  body: z.object({
    nome: z.string().min(1, "O nome é obrigatório."),
    sobreNome: z.string().min(1, "O sobrenome é obrigatório."),
    cpf: z.string().min(1, "O CPF é obrigatório."),
    rg: z.string().min(1, "O RG é obrigatório."),
    departamento: z.string().min(1, "O departamento é obrigatório."),
    email: z.string().email("Formato de e-mail inválido."),
    numeroDeTelefone: z.string().min(1, "O número de telefone é obrigatório."),
    senha: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres."),
    confirmacaoDeSenha: z.string().min(1, "A confirmação de senha é obrigatória."),
    cargoId: z.number(),
    empresaId: z.number(),
    // Campos opcionais não precisam de validação de obrigatoriedade
    cargo: z.string().optional(),
    nivel: z.string().optional(),
    salario: z.string().optional(),
    comissao: z.number().optional(),
    status: z.string().optional(),
  }).refine((data) => data.senha === data.confirmacaoDeSenha, {
    message: "As senhas não conferem.",
    path: ["confirmacaoDeSenha"],
  }),
});
