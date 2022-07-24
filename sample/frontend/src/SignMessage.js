import { useRef, useState } from 'react';
import { ethers } from 'ethers';
import ErrorMessage from './ErrorMessage';
import axios from 'axios';

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

export default function SignMessage() {
  const resultBox = useRef();
  const [signatures, setSignatures] = useState([]);
  const [error, setError] = useState();
  const baseURL = 'https://testiflqnwk.herokuapp.com/token';
  const [post, setPost] = useState(null);

  const handleSign = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    const sig = await signMessage({
      setError,
      message: data.get('message'),
    });
    if (sig) {
      setSignatures([...signatures, sig]);
    }
  };

  return (
    <div>
      <button
        className="w-full lg:w-1/2"
        onClick={() => {
          axios
            .post(baseURL, {
              nonce: 'hello',
              signature:
                '0x73ea35fb903e48406c49f01384a259d210eb443b4dec6f713c174fc9c870bc2424c5fd6423340b34769913bcd1e2b56c5e18f7ddc0803f76f6da1fb0b937fa931b',
              walletPublicAddress: '0x4ad53d31Cb104Cf5f7622f1AF8Ed09C3ca980523',
              nftContractAddress: '0x8437ee943b49945a7270109277942defe30fac25',
              nftId: '0',
            })
            .then((response) => {
              setPost(response.data);
            });
        }}
      >
        {' '}
        Test API{' '}
      </button>
      <div>
        {post && (
          <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        )}
      </div>

      <form className="m-4" onSubmit={handleSign}>
        <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Sign messages
            </h1>
            <div className="">
              <div className="my-3">
                <textarea
                  required
                  type="text"
                  name="message"
                  className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                  placeholder="Message"
                />
              </div>
            </div>
          </main>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Sign message
            </button>
            <ErrorMessage message={error} />
          </footer>
          {signatures.map((sig, idx) => {
            return (
              <div className="p-2" key={sig}>
                <div className="my-3">
                  <p>
                    Message {idx + 1}: {sig.message}
                  </p>
                  <p>Signer: {sig.address}</p>
                  <textarea
                    type="text"
                    readOnly
                    ref={resultBox}
                    className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                    placeholder="Generated signature"
                    value={sig.signature}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}
