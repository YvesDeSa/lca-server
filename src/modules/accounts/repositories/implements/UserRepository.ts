import { injectable } from "tsyringe";
import User, { IUser } from "../../entities/User";
import { compareData } from "../../../../shared/encrypt";

@injectable()
export class UsersRepository {
  async findByUsername(username: string): Promise<IUser | null> {
    const users = await User.find();

    for (const user of users) {
      const isMatch = await compareData(username, user.username);
      if (isMatch) {
        return user;
      }
    }

    return null;
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findOne({ id });
  }

  async create(username: string, password: string): Promise<IUser> {
    const user = new User({ username, password });
    return await user.save();
  }
}
