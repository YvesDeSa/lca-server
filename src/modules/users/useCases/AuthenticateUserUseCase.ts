import { IUsersRepository } from "../repositories/IUsersRepository";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  entity: {
    id: string;
    username: string;
    role?: string; // Apenas para usuários
    validated?: boolean; // Apenas para empresas
  };
  token: string;
}

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private companyRepository: ICompanyRepository
  ) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {
    try {
      console.log(`Iniciando autenticação para: ${username}`);

      let entity: any = await this.usersRepository.findByUsername(username);
      let entityType = "user";
      console.log(entity)

      if (!entity) {
        entity = await this.companyRepository.findByUsername(username);
        entityType = "company";
        console.log(entity)
      }

      if (!entity) {
        console.log("VAzio")
        throw new AppError("Usuário ou senha incorretos", 401);
      }

      console.log("Verificando senha...");
      const passwordMatch = await compare(password, entity.password);
      console.log("Resultado da comparação de senha:", passwordMatch);

      if (!passwordMatch) {
        throw new AppError("Usuário ou senha incorretos", 401);
      }

      console.log("Gerando token JWT...");
      const token = sign(
        { username: entity.username, role: entity.role },
        process.env.JWT_SECRET!,
        {
          subject: entity.id,
          expiresIn: "1d",
        }
      );

      console.log("Token gerado com sucesso:", token);

      const response: IResponse = {
        entity: {
          id: entity.id,
          username: entity.username,
          role: entityType === "user" ? entity.role : undefined,
          validated: entityType === "company" ? entity.validated : undefined,
        },
        token,
      };

      console.log("Resposta gerada com sucesso:", response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message || "Erro ao autenticar a entidade", 500);
      } else {
        console.log(error);
        throw new AppError("Erro desconhecido", 500);
      }
    }
  }
}
