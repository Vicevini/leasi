import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import urlRoutes from "./routes/urlRoutes";
import { AppDataSource } from "./data-source"; // Importa o DataSource configurado

const app = express();
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/shorten", urlRoutes);

AppDataSource.initialize()
  .then(async () => {
    console.log("Conexão com o banco de dados estabelecida com sucesso");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados", error);
  });
