import { Request, Response } from "express";
import { CreateAssociationUserUseCase } from "../useCases/CreateAssociationUserUseCase";
import { UsersRepository } from "../repositories/UsersRepository";

export class CreateAssociationUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password, associationId } = req.body;

    const createAssociationUserUseCase = new CreateAssociationUserUseCase(new UsersRepository());

    await createAssociationUserUseCase.execute({ username, password, associationId });

    return res.status(201).json({ message: "Usuário da associação criado com sucesso" });
  }
}
