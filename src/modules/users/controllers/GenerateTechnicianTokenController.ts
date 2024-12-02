import { Request, Response } from "express";
import { GenerateTechnicianTokenUseCase } from "../useCases/GenerateTechnicianTokenUseCase";
import { TokenRepository } from "../repositories/TokenRepository";

export class GenerateTechnicianTokenController {
  
  async handle(req: Request, res: Response): Promise<Response> {
    const { associationId } = req.body;

    const generateTechnicianTokenUseCase = new GenerateTechnicianTokenUseCase(new TokenRepository());

    const token = await generateTechnicianTokenUseCase.execute({associationId});

    return res.status(201).json({ token });
  }
}
