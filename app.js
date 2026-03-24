import express from 'express';
import mongoose from 'mongoose';
import { config as loadEnv } from 'dotenv';

import productRouter from './routes/products.js';

loadEnv();

const app = express();

const mongoUri = process.env.MONGO_URI;
const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 3333;

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Failed to connect to MongoDB', err);
    })
    ;

app.listen(port, () => {
    console.log(`Server is running on ${host}:${port}`);
});

app.use(express.json());

app.use('/products/', productRouter);