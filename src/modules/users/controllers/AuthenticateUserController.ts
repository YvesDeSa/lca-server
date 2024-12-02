import { Request, Response } from "express";
import { UsersRepository } from "../repositories/UsersRepository";
import { AuthenticateUserUseCase } from "../useCases/AuthenticateUserUseCase";
import { CompanyRepository } from "../repositories/CompanyRepository";

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase(
      new UsersRepository(), 
      new CompanyRepository()
    );
    console.log(username, password)
    
    try {
      const token = await authenticateUserUseCase.execute({ username, password });
      return res.json(token);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error || "Erro interno no servidor",
      });
    }
  }
}
