// src/Service/UserService.ts - VERSÃO REATORADA

import { User } from "../Model/User";
import bcrypt from "bcrypt";
import TokenService from "./TokenService";
import LoginLog from "../Model/LoginLog";

export default class UserService {

    public static async logUser(email: string, senha: string) {
        const normalizedEmail = String(email).trim().toLowerCase();

        const user = await User.findOne({ where: { email: normalizedEmail } });
        if (!user) {
            // MUDANÇA: Lançamos um erro claro
            throw new Error("Nenhum usuário encontrado com este email.");
        }


        const isMatch = await bcrypt.compare(String(senha), String(user.senha));
            if (!isMatch) {
            throw new Error("Senha incorreta.");
        }

            // Verificação de segurança para garantir que o ID existe antes de usá-lo
             if (!user.User_id) {
            throw new Error("ID do usuário não encontrado após o login.");
}

        const token = TokenService.authToken(user.User_id, user.nome, user.email);


        try {
            await LoginLog.create({
                IdUsuario: user.User_id,
                DataHoraLogin: new Date(),
                Token: token,
            } as any);
        } catch (e) {
            console.error("Falha ao registrar LoginLog:", e);
        }

        // Retornamos o objeto de sucesso
        return { token, user };
    }

    // A lógica de newUser pode ser refatorada da mesma forma no futuro
    public static async newUser(data: any) {
        // ... (código original de newUser)
    }
}
