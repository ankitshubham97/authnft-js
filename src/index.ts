import GetTokenRequest from './interfaces/getTokenRequest';
import GetTokenResponse, {
  GetTokenResponseFailure,
  GetTokenResponseSuccess,
} from './interfaces/getTokenResponse';
import JwtAccessTokenPayload from './interfaces/jwtAccessTokenPayload';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import jwt from 'jsonwebtoken';

async function doesWalletOwnNft(
  web3: Web3,
  deployedContractAbi: AbiItem[],
  deployedContractAddress: string,
  walletPublicAddress: string,
  nftContractAddress: string,
  nftId: string
): Promise<boolean> {
  const contractInstance = new web3.eth.Contract(
    deployedContractAbi,
    deployedContractAddress
  );
  const res = (await contractInstance.methods
    .walletHoldsToken(walletPublicAddress, nftContractAddress, nftId)
    .call()) as boolean;
  return res;
}

function createToken(secret: string, getTokenRequest: GetTokenRequest): string {
  const expiresIn = '1h';
  const { walletPublicAddress, nftContractAddress, nftId } = getTokenRequest;
  const jwtAccessTokenPayload: JwtAccessTokenPayload = {
    walletPublicAddress,
    nftContractAddress,
    nftId,
  };
  return jwt.sign(jwtAccessTokenPayload, secret, { expiresIn });
}

export { GetTokenResponseSuccess, GetTokenResponseFailure, GetTokenResponse };
export { JwtAccessTokenPayload };
export default function AuthNft() {
  let _secret: string;
  let _web3: Web3;
  let _deployedContractAddress: string;
  let _deployedContractAbi: AbiItem[];

  return {
    init: function ({
      secret,
      networkEndpoint,
      deployedContractAddress,
      deployedContractAbi,
    }: {
      secret: string;
      networkEndpoint: string;
      deployedContractAddress: string;
      deployedContractAbi: AbiItem[];
    }) {
      _secret = secret;
      _deployedContractAddress = deployedContractAddress;
      _deployedContractAbi = deployedContractAbi;
      _web3 = new Web3(networkEndpoint);
    },
    getDeployedContractAddress: function () {
      return _deployedContractAddress;
    },
    getDeployedContractAbi: function () {
      return _deployedContractAbi;
    },
    getToken: async function (
      getTokenRequest: GetTokenRequest
    ): Promise<GetTokenResponse> {
      const {
        nonce,
        signature,
        walletPublicAddress,
        nftContractAddress,
        nftId,
      } = getTokenRequest;
      try {
        // Verify the signature.
        const signerAddr = ethers.utils.verifyMessage(nonce, signature);
        if (signerAddr !== walletPublicAddress) {
          return {
            data: {
              errorMessage: 'Invalid signature',
              errorCode: 'invalid_signature',
            },
            code: 400,
          };
        }
        // Check if the wallet owns the NFT.
        if (
          !(await doesWalletOwnNft(
            _web3,
            _deployedContractAbi,
            _deployedContractAddress,
            walletPublicAddress,
            nftContractAddress,
            nftId
          ))
        ) {
          return {
            data: {
              errorMessage: 'Invalid NFT',
              errorCode: 'invalid_nft',
            },
            code: 400,
          };
        }
        return {
          data: {
            accessToken: createToken(_secret, getTokenRequest),
            walletPublicAddress,
            nftContractAddress,
            nftId,
            iat: Date.now(),
            exp: Date.now() + 1000 * 60 * 60 * 24 * 30,
          },
          code: 200,
        };
      } catch (err) {
        console.log(err);
        return {
          data: {
            errorMessage: 'Unknown error',
            errorCode: 'unknown_error',
          },
          code: 500,
        };
      }
    },
    verifyToken: function (token: string): boolean {
      try {
        jwt.verify(token, _secret) as JwtAccessTokenPayload;
        return true;
      } catch (err) {
        return false;
      }
    },
  };
}
