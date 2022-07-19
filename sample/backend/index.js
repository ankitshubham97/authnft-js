
import { getToken } from 'demo-authnft-js-server';
// import { getToken } from '../../src/index';

console.log(await getToken({
    nonce: "hello",
    signature: "0x73ea35fb903e48406c49f01384a259d210eb443b4dec6f713c174fc9c870bc2424c5fd6423340b34769913bcd1e2b56c5e18f7ddc0803f76f6da1fb0b937fa931b",
    walletPublicAddress: "0x4ad53d31Cb104Cf5f7622f1AF8Ed09C3ca980523",
    nftContractAddress: "0x8437ee943b49945a7270109277942defe30fac25",
    nftId: "0"
}));
