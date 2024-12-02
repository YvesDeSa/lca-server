import { IUsersRepository } from "../repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { AppError } from "../../../errors/AppError";

interface IRequest {
  username: string;
  password: string;
  associationId: string;
}

export class CreateAssociationUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ username, password, associationId }: IRequest): Promise<void> {
    try {
    const existingUser = await this.usersRepository.findByUsername(username);
    if (existingUser) {
      throw new AppError("Usuário já existe", 409);
    }

    const hashedPassword = await hash(password, 8);

    const newUser = {
      username,
      password: hashedPassword,
      role: "association",
      associationId,
    };

    await this.usersRepository.create(newUser as any);
    }catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message || "Erro ao criar a empresa", 500);
      } else {
        throw new AppError("Erro desconhecido", 500);
      }
    }
  }
}
