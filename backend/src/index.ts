import "reflect-metadata";

import { AppDataSource } from "./data-source";

import express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
import cors from 'cors';

AppDataSource.initialize().then(() => {
  const app = express();
  const allowedOrigins = ['http://localhost:3000'];

  const options: cors.CorsOptions = {
    origin: allowedOrigins
  };

  app.use(cors(options));
  app.use(bodyParser.json());
  app.use(routes);

  return app.listen(process.env.PORT_SERVER, () =>
    console.log(`Server is running in http://localhost:${process.env.PORT_SERVER}`)
  );
}).catch((error) => {
  console.log(error)
});

