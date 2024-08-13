import { Router } from "express";
import { createUser, updateUser, getUser } from "../controllers/userController";

const router = Router();

// Rota para criar um novo usuário
router.post("/users", createUser);

// Rota para atualizar um usuário existente
router.put("/users/:id", updateUser);

// Rota para obter informações de um usuário
router.get("/users/:id", getUser);

export default router;
