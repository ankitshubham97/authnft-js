import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http.exception';

function errorMiddleware(
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const status = error.status ?? 500;
  const message = error.message ?? 'Something went wrong';
  response.status(status).send({
    message,
    status,
  });
}

export default errorMiddleware;
