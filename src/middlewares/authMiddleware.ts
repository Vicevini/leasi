import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AppDataSource } from "../data-source";

const secretKey = "SECRET_KEY";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(403).json({ message: "Invalid token" });
    }

    const userId = (decoded as any).userId;

    if (!userId) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    try {
      const user = await AppDataSource.getRepository(User).findOneBy({
        id: userId,
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error retrieving user from database:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};

export const optionalAuthenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next();
  }

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(403).json({ message: "Invalid token" });
    }

    const userId = (decoded as any).userId;

    if (!userId) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    try {
      const user = await AppDataSource.getRepository(User).findOneBy({
        id: userId,
      });

      if (user) {
        req.user = user;
      }
      next();
    } catch (error) {
      console.error("Error retrieving user from database:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};
