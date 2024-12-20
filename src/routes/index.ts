import { Router } from "express";
import { userRoutes } from "./user.routes"

const routes = Router();

routes.use("/accounts", userRoutes);

export { routes };
