import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
  public app: express.Application;

  constructor(controllers: readonly Controller[]) {
    this.app = express();

    this.initializeStandardMiddlewares();
    this.initializeControllers(controllers);
  }

  public listen(): void {
    this.app.listen(process.env.PORT, () => {
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
    this.app.use(cors({origin: ['http://localhost:3001', 'https://authnft-js.vercel.app'], credentials: true}));
    // this.app.use( cookieSession({
    //   name: "__session",
    //   keys: ["key1"],
    //     maxAge: 24 * 60 * 60 * 100,
    //     secure: true,
    //     httpOnly: true,
    //     sameSite: 'none'
    // }))
    // this.app.use(session({
    //   secret: 'MYSECRET',
    //   name: 'appName',
    //   resave: false,
    //   saveUninitialized: false,
    //   store: store,
    //   cookie : {
    //     sameSite: 'strict', // THIS is the config you are looing for.
    //   }
    // }));
  }

  private initializeControllers(controllers: readonly Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });

    // Error Handling
    this.app.use(errorMiddleware);
  }
}

export default App;
