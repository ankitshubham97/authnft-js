import AuthNft, { GetTokenResponseSuccess } from 'demo-authnft-js-server';
import express from 'express';

import Controller from '../interfaces/controller.interface';
import {networkEndpoint, deployedContractAddress, deployedContractAbi} from '../constants';
import authMiddleware from '../middleware/auth.middleware';

class AuthenticationController implements Controller {
  public router = express.Router();
  public authnft = AuthNft();
  public _ = this.authnft.init({secret: process.env.JWT_SECRET ?? "", networkEndpoint, deployedContractAddress, deployedContractAbi});
  
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `/token`,
      this.getAccessToken
    );

    this.router.get(
        '/restricted-item',
        authMiddleware,
        this.getRestrictedItem
    )
  }

  private getAccessToken = async (
    request: express.Request,
    response: express.Response,
  ) => {
    const { nonce, signature, walletPublicAddress, nftContractAddress, nftId } = request.body;
    const tokenResponse = await (this.authnft.getToken({
      nonce,
      signature,
      walletPublicAddress,
      nftContractAddress,
      nftId
    }))
    if (tokenResponse.code === 200) {
        const data = tokenResponse.data as GetTokenResponseSuccess;
        response.cookie('Authorization', data.accessToken, { httpOnly: true }).send(tokenResponse.data)
        return;
    }
    response.status(tokenResponse.code).send(tokenResponse.data);
    // tokenResponse.code === 200 ? response.cookie('Authorization', tokenResponse.data["accessToken"], { httpOnly: true }).send(tokenResponse.data) : response.status(tokenResponse.code).send(tokenResponse.data);
    }

    private getRestrictedItem = async (
        _: express.Request,
        response: express.Response,
    ) => {
        response.send('You are authorized to see this restricted item');
    }

}

export default AuthenticationController;