import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/users/repositories/UsersRepository';
interface IPayload {
  iat: number;
  exp: number;
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      process.env.JWT_SECRET as string
    ) as IPayload;

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    request.user = {
      id: user_id,
      role: user.role,
    };

    next(); 

  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
