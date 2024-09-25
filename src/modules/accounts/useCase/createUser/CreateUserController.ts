import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { AppError } from "../../../../errors/AppError";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;
    
    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      await createUserUseCase.execute(username, password);
      return res.status(201).send();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Erro interno do servidor",
      });
    }
  }
}
