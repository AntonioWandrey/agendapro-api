// src/Router/AgendamentoRouter.ts

import express from "express";
import AgendamentoController from "../Controller/AgendamentoController";
import { corsOptions } from "./corsRouter";
import cors from "cors";

const router = express.Router();

// Define a rota para CRIAR um novo agendamento
// Ex: POST http://localhost:6592/agendamentos/
router.post("/", cors(corsOptions), AgendamentoController.criarNovoAgendamento);

// Define a rota para LISTAR TODOS os agendamentos
// Ex: GET http://localhost:6592/agendamentos/
router.get("/", cors(corsOptions), AgendamentoController.listarTodosAgendamentos);

// --- ROTA PARA DISPONIBILIDADE ---
// Ex: POST http://localhost:6592/agendamentos/disponibilidade
router.post("/disponibilidade", cors(corsOptions), AgendamentoController.verificarDisponibilidade);

// Futuramente, rotas de GET (por ID), PUT e DELETE aqui...

export default router;
