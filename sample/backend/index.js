import pkg from "demo-authnft-js-server";
const { AuthNft } = pkg;
console.log(new AuthNft());

// var authNft = new AuthNft({
//     secret: "secret",
//     networkEndpoint: "https://polygon-mumbai.infura.io/v3/f9179c2388e04d4ba17df0c8c6c13eae",
//     deployedContractAbi: [
//         {
//           "inputs": [
//             {
//               "internalType": "address",
//               "name": "_wallet",
//               "type": "address"
//             },
//             {
//               "internalType": "address",
//               "name": "_contract",
//               "type": "address"
//             },
//             {
//               "internalType": "uint256",
//               "name": "tokenId",
//               "type": "uint256"
//             }
//           ],
//           "name": "walletHoldsToken",
//           "outputs": [
//             {
//               "internalType": "bool",
//               "name": "",
//               "type": "bool"
//             }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//         }
//     ],
//     deployedContractAddress: "0x3AC57D033895755e09F7e51BF42D2C4f47d988e6",
// });

// var a = await authNft.getToken({nonce: "hello",
// signature: "0x73ea35fb903e48406c49f01384a259d210eb443b4dec6f713c174fc9c870bc2424c5fd6423340b34769913bcd1e2b56c5e18f7ddc0803f76f6da1fb0b937fa931b",
// walletPublicAddress: "0x4ad53d31Cb104Cf5f7622f1AF8Ed09C3ca980523",
// nftContractAddress: "0x8437ee943b49945a7270109277942defe30fac25",
// nftId: "0"})

// console.log(a);