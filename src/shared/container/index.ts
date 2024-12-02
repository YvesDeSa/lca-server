import { container } from "tsyringe";
import { UsersRepository } from "../../modules/users/repositories/UsersRepository";

container.registerSingleton<UsersRepository>(
  "UsersRepository",
  UsersRepository
);
