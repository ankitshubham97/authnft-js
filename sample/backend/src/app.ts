import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';

import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

// import EnvService from './services/env';
// import logger from './services/logger';
// import { AUTH_API, STRIPE_HOOK } from './path';

class App {
  public app: express.Application;

  constructor(controllers: readonly Controller[]) {
    this.app = express();

    this.initializeStandardMiddlewares();
    this.initializeControllers(controllers);
  }

  public listen(): void {
    this.app.listen(process.env.PORT, () => {
      /* istanbul ignore next */
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeStandardMiddlewares() {
    this.app.set('trust proxy', true);
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
      })
    );
  }

  private initializeControllers(controllers: readonly Controller[]) {
    // All the generic containers as supplied by app
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });

    // Error Handling
    this.app.use(errorMiddleware);
  }
}

export default App;