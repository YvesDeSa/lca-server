import "reflect-metadata";
import express from "express";
import "./shared/container";
import dotenv from "dotenv";
import { routes } from "./routes";
import connectDB from "./config/db";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use(routes);

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
