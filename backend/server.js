import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookies from 'cookie-parser';
import userRouter from './routes/user.route.js';
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

const app = express();

app.use(express.json());
app.use(cookies());
app.use(cors());

mongoose.connect(MONGO_DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));


app.use('/api/user', userRouter);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})