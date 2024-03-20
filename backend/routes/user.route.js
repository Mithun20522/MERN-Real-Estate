import express from 'express';
import { createUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('Test api successfull')
});

userRouter.post('/create', createUser);

export default userRouter;