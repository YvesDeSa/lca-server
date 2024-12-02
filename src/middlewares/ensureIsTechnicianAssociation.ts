import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function ensureIsTechnicianAssociation(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { user } = request;

  if (!user) {
    throw new AppError('Usuário não autenticado', 401);
  }

  if (user.role !== 'technician_association') {
    throw new AppError('Acesso negado: você não é um Técnico da Associação', 403);
  }

  next();
}
