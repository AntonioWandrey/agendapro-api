// src/Controller/UserController.ts
import { Request, Response } from "express";
import UserService from "../Service/UserService";
import TokenService from "../Service/TokenService";
import { User } from "../Model/User";
// Note que não precisamos mais importar Zod aqui

export default class UserController {

    public static async newUser(req: Request, res: Response) {
        // SEM VALIDAÇÃO MANUAL! O middleware já fez o trabalho.
        try {
            const token = await UserService.newUser(req.body);
            return res.status(201).json({ token });
        } catch (err: any) {
            if (err?.name === "SequelizeUniqueConstraintError") {
                return res.status(409).json({ message: "CPF, RG ou email já cadastrados." });
            }
            return res.status(500).json({ message: "Erro ao criar usuário.", errorMessage: err?.message });
        }
    }

    public static async loginUser(req: Request, res: Response) { /* ...código original sem alterações... */ }
    public static async listarTodos(req: Request, res: Response) { /* ...código original sem alterações... */ }
    public static async atualizarUsuario(req: Request, res: Response) { /* ...código original sem alterações... */ }
    public static async deletarUsuario(req: Request, res: Response) { /* ...código original sem alterações... */ }
    public static async findUserByToken(req: Request, res: Response) { /* ...código original sem alterações... */ }
}
