import { IToken } from "../models/Token";

export interface ITokenRepository {
  create(token: IToken): Promise<void>;
  findByToken(token: string): Promise<IToken | null>;
  deleteByToken(token: string): Promise<void>;
  isTokenValid(token: string): Promise<boolean>;
}
