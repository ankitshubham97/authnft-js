import GetTokenRequest from './interfaces/getTokenRequest';
import GetTokenResponse from './interfaces/getTokenResponse';
import JwtAccessTokenPayload from './interfaces/jwtAccessTokenPayload';
import { ethers } from "ethers";
import Web3 from 'web3';
import { AbiItem } from 'web3-utils'
import jwt from 'jsonwebtoken';

export default class AuthNft {

  private static secret: string;
  private static web3: Web3;
  private static deployedContractAddress: string;
  private static deployedContractAbi: AbiItem[];

  public static init({secret, networkEndpoint, deployedContractAddress, deployedContractAbi}: {secret: string, networkEndpoint: string, deployedContractAddress: string, deployedContractAbi: AbiItem[]}) {
    AuthNft.secret = secret;
    AuthNft.deployedContractAddress = deployedContractAddress;
    AuthNft.deployedContractAbi = deployedContractAbi;
    AuthNft.web3 = new Web3(networkEndpoint);
  }

  private static createToken(getTokenRequest:GetTokenRequest): string {
    const expiresIn = '1h';
    const { walletPublicAddress, nftContractAddress, nftId } = getTokenRequest;
    const jwtAccessTokenPayload: JwtAccessTokenPayload = {
      walletPublicAddress, nftContractAddress, nftId
    };
    return jwt.sign(jwtAccessTokenPayload, AuthNft.secret, { expiresIn });
  } 

  private static async doesWalletOwnNft(walletPublicAddress: string, nftContractAddress: string, nftId: string): Promise<boolean> {
    
    const contractInstance = new this.web3.eth.Contract(this.deployedContractAbi, this.deployedContractAddress);
    const res = await contractInstance.methods.walletHoldsToken(walletPublicAddress, nftContractAddress, nftId).call() as boolean;
    return res
  }
  
  public static async getToken(getTokenRequest:GetTokenRequest): Promise<GetTokenResponse> {
    const { nonce, signature, walletPublicAddress, nftContractAddress, nftId } = getTokenRequest;
    try {
      // Verify the signature.
      const signerAddr = ethers.utils.verifyMessage(nonce, signature);
      if (signerAddr !== walletPublicAddress) {
        return {
          data: {
            message: 'Invalid signature',
            code: 400
          }
        };
      }
      // Check if the wallet owns the NFT.
      if (!(await this.doesWalletOwnNft(walletPublicAddress, nftContractAddress, nftId))) {
        return {
          data: {
            message: 'Wallet does not own this token',
            code: 400
          }
        };
      }
      return {
        data: {
          token: this.createToken(getTokenRequest), // TODO: compute access token.
          walletPublicAddress,
          nftContractAddress,
          iat: Date.now(),
          exp: Date.now() + 1000 * 60 * 60 * 24 * 30
          }
        };
    } catch (err) {
      console.log(err);
      return {
        data: {
          message: 'Error verifying signature',
          code: 500
        }
      };
    }
  }

  public static async verifyToken(token: string): Promise<boolean> {
    try {
      jwt.verify(token, AuthNft.secret) as JwtAccessTokenPayload;
      return true
    } catch (err) {
      return false
    }
  }
}
