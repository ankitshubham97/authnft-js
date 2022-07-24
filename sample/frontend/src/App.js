import { useEffect, useState } from 'react';
import ConnectWallet from './ConnectWallet';
import ShowRestrictedResources from './ShowRestrictedResources';

export default function App() {
  const [nonce, setNonce] = useState(null);
  const [signature, setSignature] = useState(null);
  const [walletPublicAddress, setWalletPublicAddress] = useState(null);
  const [error, setError] = useState();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    setNonce(`${Date.now()}`);
  }, []);

  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-1/2">
        {nonce && setError && (
          <ConnectWallet
            nonce={nonce}
            setNonce={setNonce}
            setSignature={setSignature}
            setWalletPublicAddress={setWalletPublicAddress}
            error={error}
            setError={setError}
          />
        )}
        <div>
          nonce: {nonce}
          <br />
          signature: {signature}
          <br />
          walletPublicAddress: {walletPublicAddress}
          <br />
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        {signature && walletPublicAddress && nonce && (
          <ShowRestrictedResources
            nonce={nonce}
            signature={signature}
            walletPublicAddress={walletPublicAddress}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
          />
        )}
      </div>
    </div>
  );
}
