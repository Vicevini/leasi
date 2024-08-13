import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { URL } from "../models/URL";
import { User } from "../models/User";
import { nanoid } from "nanoid";

export const shortenUrl = async (req: Request, res: Response) => {
  const { originalUrl } = req.body;

  // Obtém o repositório usando AppDataSource
  const userRepository = AppDataSource.getRepository(User);
  const urlRepository = AppDataSource.getRepository(URL);

  // Obtém o usuário autenticado, se existir
  const user = req.user;

  try {
    // Cria uma nova URL encurtada
    const url = urlRepository.create({
      original_url: originalUrl,
      short_url: nanoid(6),
      ...(user && { user }), // Inclui o usuário apenas se ele existir
    });

    // Salva a URL no banco de dados
    await urlRepository.save(url);

    res.status(201).json(url);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while shortening the URL." });
  }
};
