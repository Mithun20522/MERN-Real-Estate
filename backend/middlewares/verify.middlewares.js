import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const verifyUser = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(400).json({message: 'Login required'});

        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        req.userId = decodedToken.userId;

        const id = req.params.id;
        if(id !== decodedToken.userId) return next(errorHandler(403,'Access denied'));
        next();
    } catch (error) {
        next(errorHandler(500,error.message));
    }
}