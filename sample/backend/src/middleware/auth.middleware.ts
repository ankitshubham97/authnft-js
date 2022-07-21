import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/http.exception';

async function authMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET as string;
    try {
      jwt.verify(cookies.Authorization, secret);
      next();
    } catch (error) {
      next(new HttpException(400, 'Invalid access token'));
    }
  } else {
    next(new HttpException(400, 'Could not find \'Authorization\' cookie'));
  }
}

export default authMiddleware;
