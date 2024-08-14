import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

const saltRounds = 10;

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User();
  user.email = email;
  user.password = hashedPassword;
  user.token = "";

  try {
    await AppDataSource.getRepository(User).save(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await AppDataSource.getRepository(User).findOneBy({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user.id }, "YOUR_SECRET_KEY", {
    expiresIn: "1h",
  });

  res.json({ token });
};
