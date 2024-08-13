import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { AppDataSource } from "../data-source";
import { URL } from "../models/URL";
import { User } from "../models/User"; // Certifique-se de importar o modelo User se necessário

export const shortenUrl = async (req: Request, res: Response) => {
  const { original_url } = req.body;
  const short_url = nanoid();

  const shortenedUrl = new URL();
  shortenedUrl.original_url = original_url;
  shortenedUrl.short_url = short_url;
  shortenedUrl.user = req.user ?? null; // Adicione a propriedade user

  try {
    await AppDataSource.getRepository(URL).save(shortenedUrl);
    res.json({
      short_url: `${req.protocol}://${req.get("host")}/${short_url}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error shortening URL", error });
  }
};
