import path from 'node:path';
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
require('dotenv').config();

import { router } from './router';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(uri)
  .then(() => {
    const port = 3001;

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(port, () => {
      console.log(`Server is running in http://localhost:${port}`);
    });
  })
  .catch((err) => console.log('error: ' + err));
