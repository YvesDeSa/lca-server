import { Request, Response } from "express";
import { CreateTechnicianGeneralUserUseCase } from "../useCases/CreateTechnicianGeneralUserUseCase";
import { UsersRepository } from "../repositories/UsersRepository";
import { TokenRepository } from "../repositories/TokenRepository";

export class CreateTechnicianGeneralUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token, username, password } = req.body;

    const createTechnicianGeneralUserUseCase = new CreateTechnicianGeneralUserUseCase(
      new TokenRepository(),
      new UsersRepository()
    );

    await createTechnicianGeneralUserUseCase.execute({ token, username, password });

    return res.status(201).json({ message: "Técnico Geral criado com sucesso!" });
  }
}