import { Router } from "express";
import { shortenUrl } from "../controllers/urlController";
import { authenticateToken } from "../middlewares/authMiddleware"; // Certifique-se de que o nome está correto

const router = Router();

router.post("/shorten-url", authenticateToken, shortenUrl);

router.post("/shorten-url/public", shortenUrl);

export default router;
