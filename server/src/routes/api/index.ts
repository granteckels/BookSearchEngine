import express from 'express';
const router = express.Router();

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from '../../schemas/index.js'

const server = new ApolloServer({ typeDefs, resolvers });
await server.start()

router.use('/users', expressMiddleware(server));

export default router;
