import { Request, Response } from "express";
import UserService from "../Service/UserService";
import TokenService from "../Service/TokenService";
import { User } from "../Model/User";

export default class UserController {
    // POST /user/newCommonUser
    public static async newUser(req: Request, res: Response) {
        
    }

    // POST /user/login (VERSÃO REATORADA)
    public static async loginUser(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ message: "Email e senha são obrigatórios." });
            }

            const { token, user } = await UserService.logUser(email, senha);

            return res.status(200).json({
                message: "Login bem-sucedido.",
                token: token,
                userData: user,
            });

        } catch (err: any) {
            if (err.message === "Nenhum usuário encontrado com este email.") {
                return res.status(404).json({ message: err.message });
            }
            if (err.message === "Senha incorreta.") {
                return res.status(401).json({ message: err.message });
            }
            return res.status(500).json({ message: "Erro interno ao efetuar login.", errorMessage: err.message });
        }
    }

    // GET /user/
    public static async listarTodos(req: Request, res: Response) {
        try {
            const usuarios = await User.findAll();
            return res.status(200).json(usuarios);
        } catch (err: any) {
            return res.status(500).json({ message: "Erro ao listar usuários.", errorMessage: err?.message });
        }
    }

    // PUT /user/:id
    public static async atualizarUsuario(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, email, cargo, nivel, salario, comissao, status, senha } = req.body;
        try {
            const usuario = await User.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            const dadosParaAtualizar: any = { nome, email, cargo, nivel, salario, comissao, status };
            if (senha) {
              dadosParaAtualizar.senha = senha;
            }
            await usuario.update(dadosParaAtualizar);
            return res.status(200).json(usuario);
        } catch (err: any) {
            return res.status(500).json({ message: "Erro ao atualizar usuário.", errorMessage: err?.message });
        }
    }

    // DELETE /user/:id
    public static async deletarUsuario(req: Request, res: Response) {
        // ... (código original sem alterações)
    }

    // POST /user/GetUserLogged
    public static async findUserByToken(req: Request, res: Response) {
        // ... (código original sem alterações)
    }
}
