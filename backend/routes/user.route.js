import express from 'express';
import { createUser, login } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('Test api successfull')
});

userRouter.post('/create', createUser);
userRouter.post('/login',login);

export default userRouter;