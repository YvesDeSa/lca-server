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

const PORT = process.env.SERVER_PORT;

app.listen(8000, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});