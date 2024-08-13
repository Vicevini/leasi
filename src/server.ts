import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import urlRoutes from "./routes/urlRoutes";
import { AppDataSource } from "./data-source";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado ao banco de dados");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) =>
    console.error("Error during Data Source initialization:", error)
  );
