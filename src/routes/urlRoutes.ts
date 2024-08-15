import { Router } from "express";
import {
  shortenUrl,
  shortURLs,
  deleteUrl,
  updateUrl,
  redirectToOriginalUrl,
} from "../controllers/urlController";
import { authenticateToken } from "../middlewares/authMiddleware"; // Certifique-se de que o nome está correto

const router = Router();

router.post("/shorten-url", authenticateToken, shortenUrl);

router.post("/shorten-url/public", shortenUrl);

router.get("/shortUrls", authenticateToken, shortURLs);

router.delete("/shortUrls/:id", authenticateToken, deleteUrl);

router.put("/shortUrls/:id", authenticateToken, updateUrl);

router.get("/redirect", redirectToOriginalUrl);

export default router;
