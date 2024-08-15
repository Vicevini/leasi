import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import urlRoutes from "./routes/urlRoutes";
import { AppDataSource } from "./data-source";

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API de Encurtamento de URLs está funcionando!");
});

app.use("/api/auth", authRoutes);
app.use("/api/shorten", urlRoutes);

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
