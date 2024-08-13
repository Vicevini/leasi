import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepository = getRepository(User);

  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepository.create({ email, password: hashedPassword });
  await userRepository.save(user);

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token });
};
