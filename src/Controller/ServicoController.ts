// src/Controller/ServicoController.ts - VERSÃO COMPLETA

import { Request, Response } from "express";
import { Servico } from "../Model/Servico";

export default class ServicoController {

  // --- CRIAR UM NOVO SERVIÇO ---
  // Rota: POST /servicos
  static async criarNovoServico(req: Request, res: Response) {
    const { nome, descricao, preco, duracao_em_minutos } = req.body;

    if (!nome || !preco || !duracao_em_minutos) {
      return res.status(400).json({ message: "Nome, preço e duração são obrigatórios." });
    }

    try {
      const novoServico = await Servico.create({ nome, descricao, preco, duracao_em_minutos });
      return res.status(201).json(novoServico);
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao criar serviço.", error: error.message });
    }
  }

  // --- LISTAR TODOS OS SERVIÇOS ---
  // Rota: GET /servicos
  static async listarTodosServicos(req: Request, res: Response) {
    try {
      const servicos = await Servico.findAll();
      return res.status(200).json(servicos);
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao listar serviços.", error: error.message });
    }
  }

  // --- BUSCAR UM SERVIÇO POR ID ---
  // Rota: GET /servicos/:id
  static async buscarServicoPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const servico = await Servico.findByPk(id);
      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado." });
      }
      return res.status(200).json(servico);
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao buscar serviço.", error: error.message });
    }
  }

  // --- ATUALIZAR UM SERVIÇO ---
  // Rota: PUT /servicos/:id
  static async atualizarServico(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, descricao, preco, duracao_em_minutos } = req.body;

    try {
      const servico = await Servico.findByPk(id);
      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado." });
      }

      await servico.update({ nome, descricao, preco, duracao_em_minutos });

      return res.status(200).json(servico); // Retorna o serviço atualizado
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao atualizar serviço.", error: error.message });
    }
  }

  // --- DELETAR UM SERVIÇO ---
  // Rota: DELETE /servicos/:id
  static async deletarServico(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const servico = await Servico.findByPk(id);
      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado." });
      }

      await servico.destroy();

      return res.status(200).json({ message: "Serviço deletado com sucesso." });
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao deletar serviço.", error: error.message });
    }
  }
}
