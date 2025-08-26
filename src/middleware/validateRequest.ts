// src/middleware/validateRequest.ts - VERSÃO CORRIGIDA

import { Request, Response, NextFunction } from 'express';
// A mudança está aqui: importamos 'ZodType' em vez de 'AnyZodObject'
import { ZodType, ZodError } from 'zod';

// E aqui, usamos 'any' para o tipo do schema, pois o Zod fará a validação interna
export const validate = (schema: ZodType<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // O parseAsync continua validando tudo corretamente
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        // A resposta de erro formatada continua a mesma
        return res.status(400).json(error.flatten().fieldErrors);
      }
      return res.status(500).json({ message: 'Erro interno na validação.' });
    }
  };
