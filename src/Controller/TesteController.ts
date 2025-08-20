import { Request, Response } from "express";

export default class TesteController{

    public static async teste(req:Request, res:Response){
        return "Funcionando Porra"
    }
}