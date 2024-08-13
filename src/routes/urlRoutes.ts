import { Router } from "express";
import { shortenUrl } from "../controllers/urlController";
import { authenticateToken } from "../middlewares/authMiddleware"; // Certifique-se de que o nome está correto

const router = Router();

// Endpoint para encurtar URL com autenticação
router.post("/shorten", authenticateToken, shortenUrl);

// Endpoint para encurtar URL sem autenticação
router.post("/shorten/public", shortenUrl);

export default router;
