import { container } from "tsyringe";
import { UsersRepository } from "../../modules/accounts/repositories/implements/UserRepository";

container.registerSingleton<UsersRepository>(
  "UsersRepository",
  UsersRepository
);
