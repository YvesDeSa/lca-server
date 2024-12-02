import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export function ensureIsRoot(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("Token não fornecido", 401);
  const [, token] = authHeader.split(" ");
  console.log(token)
  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as any;

    console.log(decoded)
    if (decoded.role !== "root") throw new AppError("Acesso negado", 403);
    next();
  } catch {
    throw new AppError("Token inválido", 401);
  }
}
