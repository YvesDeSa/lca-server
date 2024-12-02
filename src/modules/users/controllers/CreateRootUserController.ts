import { Request, Response } from "express";
import { CreateRootUserUseCase } from "../useCases/CreateRootUserUseCase";
import { UsersRepository } from "../repositories/UsersRepository";

export class CreateRootUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const createRootUserUseCase = new CreateRootUserUseCase(new UsersRepository());

    await createRootUserUseCase.execute({ username, password });

    return res.status(201).json({ message: "Usuário root criado com sucesso" });
  }
}
