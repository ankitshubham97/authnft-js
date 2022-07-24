import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ShowRestrictedResources({
  nonce,
  signature,
  walletPublicAddress,
  accessToken,
  setAccessToken,
}) {
  useEffect(() => {
    (() => {
      if (signature && walletPublicAddress && nonce) {
        axios
          .post(
            'https://testiflqnwk.herokuapp.com/token',
            {
              nonce,
              signature,
              walletPublicAddress,
              nftContractAddress: '0x8437ee943b49945a7270109277942defe30fac25',
              nftId: '0',
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            setAccessToken(response.data.accessToken);
            console.log(response);
          });
      }
    })();
  }, [signature, walletPublicAddress, nonce]);

  return (
    <div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">accessToken: {accessToken}</div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <button
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            onClick={() => {
              axios
                .get('https://testiflqnwk.herokuapp.com/restricted-item', {
                  withCredentials: true,
                })
                .then((response) => {
                  // setAccessToken(response.data.accessToken);
                  console.log(response);
                });
            }}
          >
            Access restricted resources
          </button>
        </div>
      </div>
    </div>
  );
}
