import { Request, Response } from "express";
import UserService from "../Service/UserService";
import TokenService from "../Service/TokenService";
import { User } from "../Model/User";

export default class UserController {
    // POST /users
    public static async newUser(req: Request, res: Response) {
        const {
            nome,
            sobreNome,
            cpf,
            rg,
            departamento,
            email,
            cargoId,
            numeroDeTelefone,
            senha,
            confirmacaoDeSenha,
            empresaId,
        } = req.body;

        // validação direta (rápida e clara)
        if (!nome || !sobreNome) return res.status(400).json({ message: "O nome completo é obrigatório." });
        if (!cpf || !rg) return res.status(400).json({ message: "CPF e RG são obrigatórios." });
        if (!departamento) return res.status(400).json({ message: "Departamento é obrigatório." });
        if (cargoId == null) return res.status(400).json({ message: "cargoId é obrigatório." });
        if (empresaId == null) return res.status(400).json({ message: "empresaId é obrigatório." });
        if (!email || !numeroDeTelefone) return res.status(400).json({ message: "Email e telefone são obrigatórios." });
        if (!senha || !confirmacaoDeSenha) return res.status(400).json({ message: "Senha e confirmação são obrigatórias." });
        if (senha !== confirmacaoDeSenha) return res.status(400).json({ message: "Senha e confirmação não conferem." });

        try {
            const token = await UserService.newUser({
                nome,
                sobreNome,
                cpf,
                rg,
                departamento,
                email,
                cargoId: Number(cargoId),
                numeroDeTelefone,
                senha,
                empresaId: Number(empresaId),
            });

            return res.status(201).json({ token });
        } catch (err: any) {
            // conflitos de unicidade + fallback
            if (err?.name === "SequelizeUniqueConstraintError") {
                return res.status(409).json({ message: "CPF, RG ou email já cadastrados." });
            }
            return res.status(500).json({ message: "Erro ao criar usuário.", errorMessage: err?.message });
        }
    }

    // POST /login
    public static async loginUser(req: Request, res: Response) {
        const { email, senha } = req.body;
        if (!email) return res.status(400).json({ message: "O email é necessário." });
        if (!senha) return res.status(400).json({ message: "A senha é necessária." });

        try {
            const result = await UserService.logUser(email, senha);

            if (result === "Nenhum usuário encontrado") {
                return res.status(400).json({ message: "Nenhum usuário encontrado com este email." });
            }
            if (result === "Senha incorreta") {
                return res.status(401).json({ message: "Senha incorreta." });
            }

            return res.status(200).json({
                message: "Login bem-sucedido.",
                token: result,
            });
        } catch (err: any) {
            return res.status(500).json({ message: "Erro ao efetuar login.", errorMessage: err?.message });
        }
    }


    // --- MÉTODO PARA LISTAR TODOS OS USUÁRIOS (FUNCIONÁRIOS) ---
    public static async listarTodos(req: Request, res: Response) {
        try {
            const usuarios = await User.findAll();
            return res.status(200).json(usuarios);
        } catch (err: any) {
            return res.status(500).json({ message: "Erro ao listar usuários.", errorMessage: err?.message });
        }
    }

    // --- MÉTODO PARA DELETAR UM USUÁRIO (FUNCIONÁRIO) ---
    public static async deletarUsuario(req: Request, res: Response) {
        const { id } = req.params; // Pega o ID da URL (ex: /user/123)

        try {
            const usuario = await User.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            await usuario.destroy();
            return res.status(200).json({ message: "Usuário deletado com sucesso." });

        } catch (err: any) {
            return res.status(500).json({ message: "Erro ao deletar usuário.", errorMessage: err?.message });
        }
    }

    public static async atualizarUsuario(req: Request, res: Response) {
        // --- ADICIONE ESTES CONSOLE.LOGS PARA DEBUG ---
    console.log("--- FUNÇÃO ATUALIZAR USUÁRIO CHAMADA ---");
    console.log("Parâmetros da URL (req.params):", req.params);
    console.log("Corpo da Requisição (req.body):", req.body);
        // -------------------------------------------

    const { id } = req.params;
    // Pegamos os campos que podem ser atualizados do body
    const { nome, sobreNome, email, cargoId, numeroDeTelefone } = req.body;

    try {
        const usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // Atualiza o usuário com os novos dados
        await usuario.update({ nome, sobreNome, email, cargoId, numeroDeTelefone });

        return res.status(200).json(usuario);
    } catch (err: any) {
        return res.status(500).json({ message: "Erro ao atualizar usuário.", errorMessage: err?.message });
    }
}

    // POST /users/by-token
    public static async findUserByToken(req: Request, res: Response) {
        const { Token } = req.body;
        if (!Token) return res.status(400).json({ message: "Token é obrigatório." });

        try {
            const user = await TokenService.getUserByToken(Token);
            if (user) return res.status(200).json({ user });

            return res.status(401).json({ message: "Token inválido ou não autenticado." });
        } catch (error: any) {
            return res.status(500).json({ message: "Erro ao processar token.", errorMessage: error?.message });
        }
    }
}
