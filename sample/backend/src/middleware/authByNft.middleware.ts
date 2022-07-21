import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/http.exception';
import { JwtAccessTokenPayload } from 'demo-authnft-js-server';

async function authByNftMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET as string;
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as JwtAccessTokenPayload;
      if (!request.headers['x-nft-id']) {
        next(new HttpException(400, 'Please provide the NFT token id in the request header \'x-nft-id\''));
      } else if (!request.headers['x-nft-contract-address']) {
        next(new HttpException(400, 'Please provide the NFT contract address in the request header \'x-nft-contract-address\''));
      } else if (request.headers['x-nft-id'] !== verificationResponse.nftId){
        next(new HttpException(400, 'The NFT token id in request header \'x-nft-id\' does not match with that encoded in the access token'));
      } else if (request.headers['x-nft-contract-address'] !== verificationResponse.nftContractAddress) {
        next(new HttpException(400, 'The NFT contract address in request header \'x-nft-contract-address\' does not match with that encoded in the access token'));
      }
      next();
    } catch (error) {
      next(new HttpException(400, 'Invalid access token'));
    }
  } else {
    next(new HttpException(400, 'Could not find \'Authorization\' cookie'));
  }
}

export default authByNftMiddleware;
