import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCase/createUser/CreateUserController";
import { AuthenticateUserController } from "../modules/accounts/useCase/authenticateUser/AuthenticateUserController";

const accountsRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

accountsRoutes.post("/users", createUserController.handle);
accountsRoutes.post("/sessions", authenticateUserController.handle);

export { accountsRoutes };
