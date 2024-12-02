import { Request, Response } from "express";
import { CreateAssociationGlobalUserUseCase } from "../useCases/CreateAssociationGlobalUserUseCase";
import { UsersRepository } from "../repositories/UsersRepository";

export class CreateAssociationGlobalUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const createAssociationGlobalUserUseCase = new CreateAssociationGlobalUserUseCase(
      new UsersRepository()
    );

    await createAssociationGlobalUserUseCase.execute({ username, password });

    return res.status(201).json({ message: "Usuário da associação global criado com sucesso" });
  }
}
