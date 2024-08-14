import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const secretKey = process.env.JWT_SECRET || "yourSecretKey";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { id: number };
    req.user = decoded.id as unknown as User;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
