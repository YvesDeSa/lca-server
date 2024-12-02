import { ITokenRepository } from "../repositories/ITokenRepository";
import { AppError } from "../../../errors/AppError";

interface IRequest {
  associationId: string;  // Associação do técnico
}

export class GenerateCompanyTokenUseCase {
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
    }catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message || "Erro ao criar a empresa", 500);
      } else {
        throw new AppError("Errwo desconhecido", 500);
      }
    }
  }
}
