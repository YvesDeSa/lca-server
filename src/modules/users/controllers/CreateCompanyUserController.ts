import { Request, Response } from "express";
import { CreateCompanyUseCase } from "../useCases/CreateCompanyUserUseCase";
import { TokenRepository } from "../repositories/TokenRepository";
import { CompanyRepository } from "../repositories/CompanyRepository";

export class CreateCompanyUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token, username, password } = req.body;

    const createCompanyUserUseCase = new CreateCompanyUseCase(
      new TokenRepository(),
      new CompanyRepository()
    );

    await createCompanyUserUseCase.execute({ token, username, password });

    return res.status(201).json({ message: "Empresa criada com sucesso" });
  }
}
