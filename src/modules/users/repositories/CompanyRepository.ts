import { ICompany, Company } from "../models/Company";
import { ICompanyRepository } from "./ICompanyRepository";

export class CompanyRepository implements ICompanyRepository {
  async findById(id: string): Promise<ICompany | null> {
    return await Company.findById(id).exec();
  }

  async findByUsername(username: string): Promise<ICompany | null> {
    const users = await Company.find();
    console.log(users)
    return await Company.findOne({ username }).exec();
  }

  async create(company: ICompany): Promise<void> {
    const newCompany = new Company(company);
    await newCompany.save();
  }

  async saveToken(companyId: string, token: string, expirationDate: Date): Promise<void> {
    await Company.updateOne(
      { _id: companyId },
      {
        token,
        tokenExpiration: expirationDate,
      }
    );
  }

  async findByToken(token: string): Promise<ICompany | null> {
    return await Company.findOne({ token }).exec();
  }

  async isTokenValid(companyId: string, token: string): Promise<boolean | undefined> {
    const company = await this.findById(companyId);
    if (!company || company.token !== token) return false;

    const currentDate = new Date();
    return company.tokenExpiration && company.tokenExpiration > currentDate;
  }
}