import { ITokenRepository } from "./ITokenRepository";
import { Token, IToken } from "../models/Token";

export class TokenRepository implements ITokenRepository {
  async create(tokenData: IToken): Promise<void> {
    const token = new Token(tokenData);
    await token.save();
  }

  async findByToken(token: string): Promise<IToken | null> {
    return await Token.findOne({ token }).exec();
  }

  async deleteByToken(token: string): Promise<void> {
    await Token.deleteOne({ token }).exec();
  }

  async isTokenValid(token: string): Promise<boolean> {
    const tokenRecord = await this.findByToken(token);
    if (!tokenRecord) return false;

    const currentDate = new Date();
    return tokenRecord.expirationDate > currentDate;
  }
}
