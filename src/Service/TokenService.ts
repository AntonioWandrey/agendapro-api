import jwt, { JwtPayload } from "jsonwebtoken"
import { User } from "../Model/User";


export default class TokenService {

    private static SECRET:string = "uhriur39121cnjiafakjsda993jaskfnebiaefbemniz132812";

    public static authToken(User_id:number, nome:string, email:string ){
        let user ={
            User_id,
            nome,
            email,
        }
        let token = jwt.sign(user, this.SECRET)
        if(!token){
            throw new Error("Erro ao gerar token, por favor tente novamnte, se o erro persistir, entre em contato com um administrador.")
        }
        return token
    }
    public static async getUserByToken(token: any) {
        const decoded = jwt.decode(token) as JwtPayload | null;
        console.log(decoded)
        if (!decoded || !decoded.email) {
            throw new Error("Token inválido");
        }
        let user = await User.findOne({ where: { email: decoded.email } });
        console.log(user)
        if(!user){
            throw new Error("Token inválido, nenhum usuário encontrado")
        }
        return user;
    }



}
