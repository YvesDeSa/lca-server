import { IUsersRepository } from "../repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { AppError } from "../../../errors/AppError";
import { ITokenRepository } from "../repositories/ITokenRepository";
import { User } from "../models/User";

interface IRequest {
  token: string;
  username: string;
  password: string;
}

export class CreateAssociationTechnicianUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private userRepository: IUsersRepository
  ) {}

  async execute({ token, username, password }: IRequest): Promise<void> {
    try {
      const tokenRecord = await this.tokenRepository.findByToken(token);
      if (!tokenRecord) {
        throw new AppError("Token inválido ou expirado", 400);
      }

      const existingUser = await this.userRepository.findByUsername(username);

      if (existingUser) {
        throw new AppError("Usuário já existe", 400);
      }

      const hashedPassword = await hash(password, 8);

      const newAssociationTechnician = new User({
        username,
        password: hashedPassword,
        role: "technician_association",
        associations: [tokenRecord.associationId],
      });

      await this.userRepository.create(newAssociationTechnician);
      await this.tokenRepository.deleteByToken(token);

    } catch (error) {
      console.error("Erro ao criar o Técnico da Associação:", error);

      if (error instanceof AppError) {
        throw new AppError("Erro ao criar o Técnico da Associação", 500);
      } else {
        throw new AppError("Erro ao criar o Técnico da Associação", 500);
      }
    }
  }
}
