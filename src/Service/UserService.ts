import { User } from "../Model/User";
import bcrypt from "bcrypt";
import TokenService from "./TokenService";
import LoginLog from "../Model/LoginLog";

type NewUserDTO = {
    nome: string;
    sobreNome: string;
    cpf: string;
    rg: string;
    departamento: string;
    email: string;
    cargoId: number;
    numeroDeTelefone: string;
    senha: string;
    empresaId: number;
};

export default class UserService {
    public static async newUser(data: NewUserDTO) {
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
            empresaId,
        } = data;

        const normalizedEmail = String(email).trim().toLowerCase();

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(senha, salt);

        const usuario = {
            nome,
            sobreNome,
            cpf,
            rg,
            departamento,
            email: normalizedEmail,
            cargoId,
            numeroDeTelefone,
            senha: hashedPassword,
            empresaId,
        };

        const newUser = await User.create(usuario as any);

        // gera token alinhado ao que você precisa (ajuste a assinatura se necessário)
        const token = TokenService.authToken(newUser.User_id, newUser.nome, newUser.email);
        return token;
    }

    public static async logUser(email: string, senha: string) {
        const normalizedEmail = String(email).trim().toLowerCase();

        const user = await User.findOne({ where: { email: normalizedEmail } });
        if (!user) {
            return "Nenhum usuário encontrado";
        }

        const isMatch = await bcrypt.compare(String(senha), String(user.senha));
        if (!isMatch) {
            return "Senha incorreta";
        }

        const token = TokenService.authToken(user.User_id, user.nome, user.email);

        // log de login (mantive sua lógica)
        try {
            await LoginLog.create({
                IdUsuario: user.User_id,
                DataHoraLogin: new Date(),
                Token: token,
            } as any);
        } catch (e) {
            // não derruba o login por falha de log
            console.error("Falha ao registrar LoginLog:", e);
        }

        return token;
    }

    // Se precisar manter um "newAdminUser", o model não tem userRoleId.
    // Crie admin por política de cargoId/ACL fora do model ou via tabela/relacionamento apropriado.
}
