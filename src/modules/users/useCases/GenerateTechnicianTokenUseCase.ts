import { ITokenRepository } from "../repositories/ITokenRepository";
import { AppError } from "../../../errors/AppError";

interface IRequest {
  associationId: string;
}

export class GenerateTechnicianTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute({ associationId }: IRequest): Promise<string> {
    try {
      const token = Math.floor(10000000 + Math.random() * 90000000).toString();
      
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);
      

      await this.tokenRepository.create({
        token,
        associationId,
        expirationDate
      } as any);
  

      return token;
    } catch (error) {
      throw new AppError("Erro ao gerar o token", 500);
    }
  }
}
