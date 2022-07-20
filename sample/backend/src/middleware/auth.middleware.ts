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
      const verificationResponse = jwt.verify(cookies.Authorization, secret);
      // TODO: add verification of the NFT.
      next();
    } catch (error) {
      next(new HttpException(404, 'error'));
    }
  } else {
    next(new HttpException(404, 'error'));
  }
}

export default authMiddleware;
