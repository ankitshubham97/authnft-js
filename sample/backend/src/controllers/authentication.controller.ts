import AuthNft, { GetTokenResponseSuccess } from 'demo-authnft-js-server';
import express from 'express';

import Controller from '../interfaces/controller.interface';
import {
  deployedContractAbi,
  deployedContractAddress,
  networkEndpoint,
} from '../constants';
import authMiddleware from '../middleware/auth.middleware';
import authByNftMiddleware from '../middleware/authByNft.middleware';

class AuthenticationController implements Controller {
  public router = express.Router();
  public authnft = AuthNft();
  public _ = this.authnft.init({
    secret: process.env.JWT_SECRET ?? '',
    networkEndpoint,
    deployedContractAddress,
    deployedContractAbi,
  });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/token`, this.getAccessToken);
    this.router.get('/restricted-item', authMiddleware, this.getRestrictedItem);
    this.router.get('/restricted-item-by-nft', authByNftMiddleware, this.getRestrictedItemByNft);
  }

  private getAccessToken = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { nonce, signature, walletPublicAddress, nftContractAddress, nftId } =
      request.body;
    const tokenResponse = await this.authnft.getToken({
      nonce,
      signature,
      walletPublicAddress,
      nftContractAddress,
      nftId,
    });
    if (tokenResponse.code === 200) {
      const data = tokenResponse.data as GetTokenResponseSuccess;
      response
        .cookie('Authorization', data.accessToken, { sameSite: 'none', secure: true, httpOnly: true })
        .send(tokenResponse.data);
      return;
    }
    response.status(tokenResponse.code).send(tokenResponse.data);
  };

  private getRestrictedItem = async (
    _: express.Request,
    response: express.Response
  ) => {
    response.send('You are authorized to see this restricted item');
  };

  
  private getRestrictedItemByNft = async (
    express: express.Request,
    response: express.Response
  ) => {
    response.send(`You are authorized to see this restricted item because you own NFT with token id ${express.headers['x-nft-id']} and at contract address ${express.headers['x-nft-contract-address']}`);
  };
}

export default AuthenticationController;
