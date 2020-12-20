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

    // allow CORS from client app
    app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      }),
    );
    // allow JSON requests
    app.use(express.json());
    // use MongoDB session
    app.use(session);

    const schema = await createSchema();

    // create GraphQL server
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      // enable GraphQL Playground
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    });

    apolloServer.applyMiddleware({ app, cors: true });

    // start the server
    app.listen({ port }, () => {
      console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
    });
  } catch (err) {
    console.log(err);
  }
}

createServer();
