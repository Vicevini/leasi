import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

createConnection()
  .then(() => {
    console.log("Conectado ao banco de dados");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
