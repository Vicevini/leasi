import { DataSource } from "typeorm";
import { User } from "./models/User";
import { URL } from "./models/URL";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "vini",
  database: "leasiDev",
  entities: [User, URL],
  synchronize: true,
});
