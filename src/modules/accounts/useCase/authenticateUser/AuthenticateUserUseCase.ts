import { UsersRepository } from "../../repositories/implements/UserRepository";
import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import { compareData } from "../../../../shared/encrypt";

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(username: string, password: string): Promise<string> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError("Email ou senha incorretos", 409);
    }

    const passwordMatch = await compareData(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email ou senha incorretos", 409);
    }

    const token = sign({}, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: "1d",
    });

    return token;
  }
}
