import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

mongoose.connect('mongodb://root:eduardo156@localhost:27017/waiter?authSource=admin')
  .then(() => {
    const app = express();

    const port = 3001;

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(port, () => {
      console.log(`Server is running in http://localhost:${port}`);
    });
  })
  .catch(() => console.log('error'));

// mongodb://root:eduardo156@localhost:27017/library?authSource=admin
