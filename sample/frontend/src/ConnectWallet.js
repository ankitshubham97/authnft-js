import { ethers } from 'ethers';
// import ErrorMessage from './ErrorMessage';

export default function ConnectWallet({
  nonce,
  setNonce,
  signature,
  setSignature,
  walletPublicAddress,
  setWalletPublicAddress,
  error,
  setError,
}) {
  console.log(nonce);

  const signMessage = async ({ setError, message }) => {
    try {
      console.log({ message });
      if (!window.ethereum)
        throw new Error('No crypto wallet found. Please install it.');

      await window.ethereum.send('eth_requestAccounts');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();

      return {
        message,
        signature,
        address,
      };
    } catch (err) {
      setError(err.message);
    }
  };

  const connectWallet = async (e) => {
    e.preventDefault();
    setError();
    const sig = await signMessage({
      setError,
      message: nonce,
    });
    if (sig) {
      setSignature(sig.signature);
      setWalletPublicAddress(sig.address);
      setNonce(sig.message);
    } else {
      setError('No signature');
    }
  };

  return (
    <div className="m-4 credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
      <button
        className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
        onClick={connectWallet}
      >
        Sign message
      </button>
      {/* <ErrorMessage message={error} /> */}
    </div>
  );
}
