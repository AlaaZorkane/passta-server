// black magic
import "module-alias/register";
import "reflect-metadata";

// configuration
import APP_CONFIG from "./config";

// app
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createSchema } from "./utils/createSchema";
import { createConnection } from "typeorm";

async function bootstrap(): Promise<void> {
  await createConnection();
  const schema = await createSchema();
  const apolloServer = new ApolloServer({ schema, context: ({ req, res }) => ({ req, res }) });
  const app = express();
  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(APP_CONFIG.PORT, () => {
    console.log(`[+] App started at http://localhost:${APP_CONFIG.PORT}`);
  });
}

bootstrap();
