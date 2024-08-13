import { Router } from "express";
import { shortenURL } from "../controllers/urlController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/shorten", authenticate, shortenURL);

export default router;
