import { AbiItem } from 'web3-utils';

export const deployedContractAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_wallet',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_contract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'walletHoldsToken',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as AbiItem[];
export const deployedContractAddress =
  '0x3AC57D033895755e09F7e51BF42D2C4f47d988e6';
export const networkEndpoint =
  'https://polygon-mumbai.infura.io/v3/f9179c2388e04d4ba17df0c8c6c13eae';
