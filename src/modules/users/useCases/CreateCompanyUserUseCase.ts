// useCases/createCompany/CreateCompanyUseCase.ts
import { ITokenRepository } from "../repositories/ITokenRepository";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { AppError } from "../../../errors/AppError";
import { Company } from "../models/Company";
import { encryptData } from "../../../shared/encrypt";

interface IRequest {
  token: string;
  username: string, 
  password: string
}

export class CreateCompanyUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private companyRepository: ICompanyRepository
  ) {}

  async execute({ token, username, password }: IRequest): Promise<void> {
    try {
      const tokenRecord = await this.tokenRepository.findByToken(token);
      if (!tokenRecord) {
        throw new AppError("Token inválido ou expirado", 400);
      }

      const hashedPassword = await encryptData(password);

      const newCompany = new Company({
        username, 
        password: hashedPassword,
        associationId: tokenRecord.associationId
      });

      await this.companyRepository.create(newCompany);
      await this.tokenRepository.deleteByToken(token);
      
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message || "Erro ao criar a empresa", 500);
      } else {
        throw new AppError("Erro desconhecido", 500);
      }
    }
  }
}
