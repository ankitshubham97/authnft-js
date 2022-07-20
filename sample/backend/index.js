"use strict";
exports.__esModule = true;
// import CommonModule from 'test-npm-module';
var demo_authnft_js_server_1 = require("demo-authnft-js-server");
var deployedContractAbi = [
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
];
var deployedContractAddress = "0x3AC57D033895755e09F7e51BF42D2C4f47d988e6";
var networkEndpoint = "https://polygon-mumbai.infura.io/v3/f9179c2388e04d4ba17df0c8c6c13eae";
var nonce = "hello";
var signature = "0x73ea35fb903e48406c49f01384a259d210eb443b4dec6f713c174fc9c870bc2424c5fd6423340b34769913bcd1e2b56c5e18f7ddc0803f76f6da1fb0b937fa931b";
var walletPublicAddress = "0x4ad53d31Cb104Cf5f7622f1AF8Ed09C3ca980523";
var nftContractAddress = "0x8437ee943b49945a7270109277942defe30fac25";
var nftId = "0";
var authnft = (0, demo_authnft_js_server_1["default"])();
authnft.init({ secret: "string", networkEndpoint: networkEndpoint, deployedContractAddress: deployedContractAddress, deployedContractAbi: deployedContractAbi });
console.log(authnft.getDeployedContractAddress());
(authnft.getToken({
    nonce: nonce,
    signature: signature,
    walletPublicAddress: walletPublicAddress,
    nftContractAddress: nftContractAddress,
    nftId: nftId
})).then(function (data) { return console.log(data); })["catch"](function (err) { return console.log(err); });
console.log(authnft.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRQdWJsaWNBZGRyZXNzIjoiMHg0YWQ1M2QzMUNiMTA0Q2Y1Zjc2MjJmMUFGOEVkMDlDM2NhOTgwNTIzIiwibmZ0Q29udHJhY3RBZGRyZXNzIjoiMHg4NDM3ZWU5NDNiNDk5NDVhNzI3MDEwOTI3Nzk0MmRlZmUzMGZhYzI1IiwibmZ0SWQiOiIwIiwiaWF0IjoxNjU4MzIxNzg5LCJleHAiOjE2NTgzMjUzODl9.zgHMamzXFBnvrKitfV0g9V2wECljmNxGygrjMtOVFlc'));
