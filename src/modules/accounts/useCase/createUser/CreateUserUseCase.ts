import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { UsersRepository } from "../../repositories/implements/UserRepository";
import { encryptData } from "../../../../shared/encrypt";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute(username: string, password: string): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByUsername(username);

    if (userAlreadyExists) {
      throw new AppError("Username já está em uso!", 409);
    }

    const hashedUsername = await encryptData(username);
    const hashedPassword = await encryptData(password);

    await this.usersRepository.create(hashedUsername, hashedPassword);
  }
}
