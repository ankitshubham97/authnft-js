import dotenv from 'dotenv';
import App from './app';
import AuthenticationController from './controllers/authentication.controller';

dotenv.config();

const app = new App([new AuthenticationController()]);
app.listen();
