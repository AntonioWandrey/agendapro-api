// src/Router/ServicoRouter.ts

import express from "express";
import ServicoController from "../Controller/ServicoController";
import { corsOptions } from "./corsRouter"; // Reutilizando a configuração de CORS
import cors from "cors";

const router = express.Router();

// Define a rota para CRIAR um novo serviço
// Ex: POST http://localhost:6592/servicos/
router.post("/", cors(corsOptions), ServicoController.criarNovoServico);

// Define a rota para LISTAR TODOS os serviços
// Ex: GET http://localhost:6592/servicos/
router.get("/", cors(corsOptions), ServicoController.listarTodosServicos);


// --- Rotas futuras que já podemos deixar mapeadas ---

// Rota para BUSCAR UM serviço específico pelo ID
// Ex: GET http://localhost:6592/servicos/123
router.get("/:id", cors(corsOptions), ServicoController.buscarServicoPorId);

// Rota para ATUALIZAR um serviço pelo ID
// Ex: PUT http://localhost:6592/servicos/123
router.put("/:id", cors(corsOptions), ServicoController.atualizarServico);

// Rota para DELETAR um serviço pelo ID
// Ex: DELETE http://localhost:6592/servicos/123
router.delete("/:id", cors(corsOptions), ServicoController.deletarServico);


export default router;
