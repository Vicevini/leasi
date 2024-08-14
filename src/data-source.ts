import { DataSource } from "typeorm";
import { User } from "./models/User";
import { URL } from "./models/URL";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  password: "vini",
  database: "leasiDev",
  entities: [User, URL],
  migrations: [],
  subscribers: [],
  synchronize: true,
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Conexão com o banco de dados estabelecida!");

    const users = await AppDataSource.getRepository(User).find();
    console.log("Dados na tabela User:", users);

    const urls = await AppDataSource.getRepository(URL).find();
    console.log("Dados na tabela ShortnedUrl:", urls);
  })
  .catch((error) => console.log("Erro ao conectar no banco de dados:", error));
