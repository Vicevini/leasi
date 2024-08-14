import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../data-source";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Nome, email e senha são obrigatórios." });
  }

  try {
    const userRepository = AppDataSource.getRepository(User);
    const newUser = new User();
    newUser.email = email;
    newUser.password = password;

    await userRepository.save(newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (user) {
      user.email = email || user.email;

      await userRepository.save(user);
      return res.json(user);
    } else {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};
