import "reflect-metadata";

import { AppDataSource } from "./data-source";

import express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(bodyParser.json());
  app.use(routes);

  return app.listen(process.env.PORT_SERVER, () =>
    console.log(`Server is running in http://localhost:${process.env.PORT_SERVER}`)
  );
}).catch((error) => {
  console.log(error)
});

