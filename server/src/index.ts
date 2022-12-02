import path from 'node:path';
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { router } from './router';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect('mongodb://root:eduardo156@localhost:27017/waiter?authSource=admin')
  .then(() => {

    const port = 3001;

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(port, () => {
      console.log(`Server is running in http://localhost:${port}`);
    });
  })
  .catch(() => console.log('error'));
