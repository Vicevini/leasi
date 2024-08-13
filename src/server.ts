import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import urlRoutes from "./routes/urlRoutes";

const app = express();
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/shorten", urlRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
