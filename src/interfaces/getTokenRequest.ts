interface GetTokenRequest {
  nonce: string;
  signature: string;
  walletPublicAddress: string;
  nftContractAddress: string;
  nftId: string;
}

export default GetTokenRequest;
