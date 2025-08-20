import express from "express";
import UserController from "../Controller/UserController";
import { corsOptions } from "./corsRouter";
import cors from "cors";

const router = express.Router();

router.post("/newCommonUser", cors(corsOptions), UserController.newUser);
router.post("/login", cors(corsOptions), UserController.loginUser);
router.post("/GetUserLogged", cors(corsOptions), UserController.findUserByToken);

// Rota para LISTAR TODOS os usuários
// GET http://localhost:6592/user/
router.get("/", cors(corsOptions), UserController.listarTodos);

// Rota para DELETAR um usuário pelo ID
// DELETE http://localhost:6592/user/123
router.delete("/:id", cors(corsOptions), UserController.deletarUsuario);

// Rota para ATUALIZAR um usuário pelo ID
// PUT http://localhost:6592/user/123
router.put("/:id", cors(corsOptions), UserController.atualizarUsuario);

export default router;
