
import { hash } from "bcryptjs";
import { ITokenRepository } from "../repositories/ITokenRepository";
import { AppError } from "../../../errors/AppError";
import { User } from "../models/User";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  token: string;
  username: string;
  password: string;
}

export class CreateTechnicianGeneralUserUseCase {
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

      const newTechnicianGeneral = new User({
        username,
        password: hashedPassword,
        role: "technician_general", 
        associations: [],
      });

      await this.userRepository.create(newTechnicianGeneral);

      await this.tokenRepository.deleteByToken(token);

    } catch (error) {
      throw new AppError("Erro ao criar o Técnico Geral", 500);
    }
  }
}
