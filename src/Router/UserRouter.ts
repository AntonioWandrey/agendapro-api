// src/Router/UserRouter.ts
import express from "express";
import UserController from "../Controller/UserController";
import { corsOptions } from "./corsRouter";
import cors from "cors";
import { validate } from "../middleware/validateRequest";
import { newUserSchema } from "../schemas/userSchemas";

const router = express.Router();

router.post("/newCommonUser", cors(corsOptions), validate(newUserSchema), UserController.newUser);
router.post("/login", cors(corsOptions), UserController.loginUser);
router.post("/GetUserLogged", cors(corsOptions), UserController.findUserByToken);
router.get("/", cors(corsOptions), UserController.listarTodos);
router.delete("/:id", cors(corsOptions), UserController.deletarUsuario);
router.put("/:id", cors(corsOptions), UserController.atualizarUsuario);

export default router;
