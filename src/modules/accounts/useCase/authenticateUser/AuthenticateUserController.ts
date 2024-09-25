import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersRepository } from "../../repositories/implements/UserRepository";

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const usersRepository = new UsersRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

    try {
      const token = await authenticateUserUseCase.execute(username, password);
      return res.json({ token });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}
