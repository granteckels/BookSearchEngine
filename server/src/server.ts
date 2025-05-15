import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import './config/connection.js';
import routes from './routes/index.js'

import dotenv from 'dotenv';
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: /http:\/\/localhost:(3000|3001)/
}));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
}

app.use(routes);

app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
