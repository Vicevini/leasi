import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { URL } from "../models/URL";
import { User } from "../models/User";

export const shortenUrl = async (req: Request, res: Response) => {
  const { original_url } = req.body;

  // Use import() para módulos ES6
  const { nanoid } = await import("nanoid");
  const short_url = nanoid();

  const shortenedUrl = new URL();
  shortenedUrl.original_url = original_url;
  shortenedUrl.short_url = short_url;

  // Verifique se req.user existe e é um User completo
  if (req.user) {
    shortenedUrl.user = req.user as User; // Força o tipo User
  } else {
    shortenedUrl.user = null; // Ou null se não estiver autenticado
  }

  try {
    await AppDataSource.getRepository(URL).save(shortenedUrl);
    res.json({
      short_url: `${req.protocol}://${req.get("host")}/${short_url}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error shortening URL", error });
  }
};
