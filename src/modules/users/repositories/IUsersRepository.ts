import { IUser } from "../models/User";

export interface IUsersRepository {
  findById(id: string): Promise<IUser | null>;
  findByUsername(username: string): Promise<IUser | null>;
  create(user: IUser): Promise<void>;
  updatePassword(userId: string, newPassword: string): Promise<void>;
  listAll(): Promise<IUser[]>;
}
