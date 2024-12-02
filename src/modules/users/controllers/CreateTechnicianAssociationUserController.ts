import { Request, Response } from "express";
import { UsersRepository } from "../repositories/UsersRepository";
import { TokenRepository } from "../repositories/TokenRepository";
import { CreateAssociationTechnicianUseCase } from "../useCases/CreateTechnicianAssociationUseCase";

export class CreateAssociationTechnicianController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token, username, password } = req.body;

    const createAssociationTechnicianUseCase = new CreateAssociationTechnicianUseCase(
      new TokenRepository(),
      new UsersRepository()
    );

    await createAssociationTechnicianUseCase.execute({ token, username, password });

    return res.status(201).json({ message: "Técnico da Associação criado com sucesso!" });
  }
}