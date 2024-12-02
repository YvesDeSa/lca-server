import { IUser, User } from "../models/User";
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id).exec();
  }

  async findByUsername(username: string): Promise<IUser | null> {
    const users = await User.find();
    console.log(users)
    return await User.findOne({ username }).exec();
  }

  async create(user: IUser): Promise<void> {
    const newUser = new User(user);
    await newUser.save();
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.findById(userId);
    if (user) {
      user.password = newPassword;
      await user.save();
    }
  }

  async listAll(): Promise<IUser[]> {
    return await User.find().exec();
  }
}
