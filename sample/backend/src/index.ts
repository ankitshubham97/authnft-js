import dotenv from 'dotenv';
import App from './app';
import AuthenticationController from './controllers/authentication.controller';

dotenv.config();

// Setup db connection and then start app
const app = new App([new AuthenticationController()]);
app.listen();
/*
const app: Express = express();
const port = process.env.PORT;
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
const authnft = AuthNft();
authnft.init({secret: process.env.JWT_SECRET ?? "", networkEndpoint, deployedContractAddress, deployedContractAbi});

app.get('/', (req: Request, res: Response) => {
  res.send('NFT-based authentication demo');
});

app.post('/token', (req: Request, res: Response) => {
  console.log(req)
  const { nonce, signature, walletPublicAddress, nftContractAddress, nftId } = req.body;
  (authnft.getToken({
    nonce,
    signature,
    walletPublicAddress,
    nftContractAddress,
    nftId
  })).then((data: any) => {console.log(data); res.send("OK")}).catch((err: any) => {console.log(err); res.status(400).send(err);});
});

app.get('/api/restricted-item', authMiddleware, (req: Request, res: Response) => {
  res.send('Restricted Item');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
*/
