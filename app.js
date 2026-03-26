import express from 'express';
import mongoose from 'mongoose';
import { config as loadEnv } from 'dotenv';

import connectDB from './db/connect.js';
import productRouter from './routes/products.js';

loadEnv();

const app = express();

const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 3333;

app.listen(port, async () => {
    try {
        await connectDB();
    console.log(`Server is running on ${host}:${port}`);
    } catch (err) {
        console.error('Cannot start server: ', err);
    }
});

app.use(express.json());

app.use('/products/', productRouter);