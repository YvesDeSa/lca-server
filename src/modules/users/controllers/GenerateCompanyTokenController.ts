import { Request, Response } from "express";
import { GenerateCompanyTokenUseCase } from "../useCases/GenerateCompanyTokenUseCase";
import { TokenRepository } from "../repositories/TokenRepository";

export class GenerateCompanyTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { associationId } = req.body;

    const generateCompanyTokenUseCase = new GenerateCompanyTokenUseCase(new TokenRepository());

    const token = await generateCompanyTokenUseCase.execute({ associationId });

    return res.status(201).json({ token });
  }
}
