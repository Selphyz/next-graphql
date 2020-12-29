import './env';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';

import createSchema from '../schema';
import createSession from '../session';

async function createServer() {
  try {
    const port = process.env.PORT;
    const session = await createSession();
    const app = express();

    // app.use(cors());
    app.use(session);
    app.use(express.json());
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
    const schema = await createSchema();
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    });
    const corsOptions = {
      origin: 'http://localhost:3000',
      credentials: true,
    };

    apolloServer.applyMiddleware({
      app,
      cors: corsOptions,
    });

    app.listen({ port }, () => {
      console.log(`Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
    });
  } catch (err) {
    console.log(err);
  }
}

createServer();
