// src/Controller/AgendamentoController.ts

import { Request, Response } from "express";
import { Agendamento } from "../Model/Agendamento";
import { Servico } from "../Model/Servico";
import { User } from "../Model/User";

export default class AgendamentoController {

  // --- CRIAR UM NOVO AGENDAMENTO ---
  // Rota: POST /agendamentos
  static async criarNovoAgendamento(req: Request, res: Response) {
    const { data, hora_inicio, servicoId, funcionarioId, clienteId } = req.body;

    if (!data || !hora_inicio || !servicoId || !funcionarioId || !clienteId) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
      const servico = await Servico.findByPk(servicoId);
      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado." });
      }

      const [horas, minutos] = hora_inicio.split(':').map(Number);
      const dataInicio = new Date();
      dataInicio.setHours(horas, minutos, 0, 0);

      const dataFim = new Date(dataInicio.getTime() + servico.duracao_em_minutos * 60000);
      const hora_fim = dataFim.toTimeString().substring(0, 8);

      const novoAgendamento = await Agendamento.create({
        data,
        hora_inicio,
        hora_fim,
        servicoId,
        funcionarioId,
        clienteId,
        status: 'Marcado'
      });

      return res.status(201).json(novoAgendamento);

    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao criar agendamento.", error: error.message });
    }
  }

  // --- LISTAR TODOS OS AGENDAMENTOS ---
  // Rota: GET /agendamentos
  static async listarTodosAgendamentos(req: Request, res: Response) {
    try {
      const agendamentos = await Agendamento.findAll({
        include: [
          { model: Servico },
          { model: User, as: 'funcionario' },
          { model: User, as: 'cliente' }
        ]
      });
      return res.status(200).json(agendamentos);
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao listar agendamentos.", error: error.message });
    }
  }

  // --- NOVO MÉTODO PARA VERIFICAR DISPONIBILIDADE ---
static async verificarDisponibilidade(req: Request, res: Response) {
  const { data, servicoId, funcionarioId } = req.body;

  if (!data || !servicoId || !funcionarioId) {
    return res.status(400).json({ message: "Data, serviço e funcionário são obrigatórios para verificar a disponibilidade." });
  }

  try {
    // --- A LÓGICA COMPLEXA DE CÁLCULO ENTRARÁ AQUI ---
    // Por enquanto, vamos retornar uma lista fixa para testar a rota.
    const horariosDisponiveis = ["09:00", "10:30", "11:00", "14:00"];

    return res.status(200).json(horariosDisponiveis);

  } catch (error: any) {
    return res.status(500).json({ message: "Erro ao verificar disponibilidade.", error: error.message });
  }
}
}
