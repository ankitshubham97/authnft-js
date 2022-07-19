import GetTokenRequest from './interfaces/getTokenRequest';
import GetTokenResponse from './interfaces/getTokenResponse'
import { ethers } from "ethers";
import {DEPLOYED_CONTRACT_ABI, DEPLOYED_CONTRACT_ADDRESS, NETWORK_ENDPOINT} from './constants';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils'


async function doesWalletOwnNft(walletPublicAddress: string, nftContractAddress: string, nftId: string): Promise<boolean> {
  const web3 = new Web3(NETWORK_ENDPOINT);
  const contractInstance = new web3.eth.Contract(DEPLOYED_CONTRACT_ABI as AbiItem[], DEPLOYED_CONTRACT_ADDRESS);
  const res = await contractInstance.methods.walletHoldsToken(walletPublicAddress, nftContractAddress, nftId).call() as boolean;
  return res
}

export async function getToken(getTokenRequest:GetTokenRequest): Promise<GetTokenResponse> {
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
    if (!(await doesWalletOwnNft(walletPublicAddress, nftContractAddress, nftId))) {
      return {
        data: {
          message: 'Wallet does not own this token',
          code: 400
        }
      };
    }
    return {
      data: {
        token: 'token', // TODO: compute access token.
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