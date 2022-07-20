// import CommonModule from 'test-npm-module';
import AuthNft from "demo-authnft-js-server";
import { AbiItem } from 'web3-utils'

const deployedContractAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_wallet",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_contract",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "walletHoldsToken",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ] as AbiItem[];
const deployedContractAddress = "0x3AC57D033895755e09F7e51BF42D2C4f47d988e6";
const networkEndpoint = "https://polygon-mumbai.infura.io/v3/f9179c2388e04d4ba17df0c8c6c13eae";

const nonce = "hello"
const signature = "0x73ea35fb903e48406c49f01384a259d210eb443b4dec6f713c174fc9c870bc2424c5fd6423340b34769913bcd1e2b56c5e18f7ddc0803f76f6da1fb0b937fa931b";
const walletPublicAddress = "0x4ad53d31Cb104Cf5f7622f1AF8Ed09C3ca980523";
const nftContractAddress = "0x8437ee943b49945a7270109277942defe30fac25";
const nftId = "0";


const authnft = AuthNft();
authnft.init({secret: "string", networkEndpoint, deployedContractAddress, deployedContractAbi});
console.log(authnft.getDeployedContractAddress());
(authnft.getToken({
    nonce,
    signature,
    walletPublicAddress,
    nftContractAddress,
    nftId
})).then((data: any) => console.log(data)).catch((err: any) => console.log(err));

console.log(authnft.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRQdWJsaWNBZGRyZXNzIjoiMHg0YWQ1M2QzMUNiMTA0Q2Y1Zjc2MjJmMUFGOEVkMDlDM2NhOTgwNTIzIiwibmZ0Q29udHJhY3RBZGRyZXNzIjoiMHg4NDM3ZWU5NDNiNDk5NDVhNzI3MDEwOTI3Nzk0MmRlZmUzMGZhYzI1IiwibmZ0SWQiOiIwIiwiaWF0IjoxNjU4MzIxNzg5LCJleHAiOjE2NTgzMjUzODl9.zgHMamzXFBnvrKitfV0g9V2wECljmNxGygrjMtOVFlc'));
