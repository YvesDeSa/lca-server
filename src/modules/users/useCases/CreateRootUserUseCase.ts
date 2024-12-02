import { hash } from "bcryptjs";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { AppError } from "../../../errors/AppError";
import { encryptData } from "../../../shared/encrypt";
import { IUser } from "../models/User";
import { encryptDeterministic } from "../../../shared/crypto";

interface IRequest {
  username: string;
  password: string;
}

export class CreateRootUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ username, password }: IRequest): Promise<void> {
    try {
      const hashedPassword = await encryptData(password);
  
      const user = {
        username,
        password: hashedPassword,
        role: "root",
      };
  
      const existingUser = await this.usersRepository.findByUsername(username);
      if (existingUser) {
        throw new Error("Username já existe");
      }
  
      await this.usersRepository.create(user as IUser);

    }catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message || "Erro ao criar User Root", 500);
      } else {
        throw new AppError("Erro desconhecido", 500);
      }
    }
  }
}
