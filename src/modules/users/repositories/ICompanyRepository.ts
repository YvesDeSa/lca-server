import { ICompany } from "../models/Company";

export interface ICompanyRepository {
  findById(id: string): Promise<ICompany | null>;findByUsername(username: string): Promise<ICompany | null>;
  create(company: ICompany): Promise<void>;
  saveToken(companyId: string, token: string, expirationDate: Date): Promise<void>;
  findByToken(token: string): Promise<ICompany | null>;
  isTokenValid(companyId: string, token: string): Promise<boolean | undefined>;
}
