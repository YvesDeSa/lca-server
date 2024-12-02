import { AppError } from "../../../errors/AppError";
import { IUser } from "../models/User";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { hash } from "bcryptjs";

interface IRequest {
  username: string;
  password: string;
}

export class CreateAssociationGlobalUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ username, password }: IRequest): Promise<void> {
    try {
    const existingUser = await this.usersRepository.findByUsername(username);
    if (existingUser) {
      throw new AppError("Usuário já existe", 409);
    }

    const hashedPassword = await hash(password, 8);

    const newUser = {
      username,
      password: hashedPassword,
      role: "association_global",
    };

    await this.usersRepository.create(newUser as IUser);
    
    }catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message || "Erro ao criar a empresa", 500);
      } else {
        throw new AppError("Erro desc onhecido", 500);
      }
    }
  }
}
