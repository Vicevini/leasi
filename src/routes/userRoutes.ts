import { Router } from "express";
import { createUser, updateUser, getUser } from "../controllers/userController";

const router = Router();

router.post("/users", createUser);

router.put("/users/:id", updateUser);

router.get("/users/:id", getUser);

export default router;
