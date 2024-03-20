import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookies from 'cookie-parser';
import userRouter from './routes/user.route.js';
dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

const app = express();

app.use(express.json());
app.use(cookies());

mongoose.connect(MONGO_DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));


app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})