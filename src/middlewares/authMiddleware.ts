import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const user = await AppDataSource.getRepository(User).findOneBy({ token });

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error verifying token", error });
  }
};
