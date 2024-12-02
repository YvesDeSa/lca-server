import 'express-async-errors'
import "reflect-metadata";
import "./shared/container";
import express from "express";
import dotenv from "dotenv";
import { routes } from "./routes";
import connectDB from "./config/db";
import { corsMiddleware } from "./shared/cors";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.use(express.json());

app.use(corsMiddleware);

connectDB();

app.use(routes);

app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`🚀 Server running on port ${process.env.SERVER_PORT}`);
});
