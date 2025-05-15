import express from 'express';
import path from 'node:path';
import cors from 'cors';
import './config/connection.js';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js'
import { authenticateToken } from './services/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(import.meta.dirname, '../client/build')));
}

const server = new ApolloServer({ typeDefs, resolvers });
await server.start()

app.use('/graphql', expressMiddleware(server, { context: authenticateToken }));

app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
