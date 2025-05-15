import type { Request, Response } from 'express';
import express from 'express';
const router = express.Router();

import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from '../schemas/index.js'
import { authenticateToken } from '../services/auth.js';

const server = new ApolloServer({ typeDefs, resolvers });
await server.start()

router.use('/graphql', expressMiddleware(server, { context: authenticateToken }));

// serve up react front-end in production
router.use((_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

export default router;
