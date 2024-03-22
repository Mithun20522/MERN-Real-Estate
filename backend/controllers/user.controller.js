import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async(req, res, next) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password) return next(errorHandler(400,'All fields are mandatory.'))

        const user = await User.findOne({username, email});
        if(user) return next(errorHandler(409,'User already exist.'))

        const userDetails = new User({
            username,
            email,
            password
        });

        await userDetails.save();
        return res.status(201).json({userDetails,message:'User registered successfully.'});

    } catch (error) {
        return next(errorHandler(500, error.message));
    }
}

export const login = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) return next(errorHandler(400,'All fields are mandatory'));
        
        const isExist = await User.findOne({email});
        if(!isExist) return next(errorHandler(404, 'User not found'));
        const isMatched = await bcrypt.compare(password, isExist.password);
        if(!isMatched) return next(errorHandler(400,'Email or password not correct'));
        
        const isAlreadyLogin = req.cookies.token;

        if(isAlreadyLogin) return next(errorHandler(400,'You are already logged in'));

        const token = jwt.sign({userId:isExist._id}, process.env.SECRET_TOKEN_KEY,{expiresIn:'1h'});
        res.cookie('token',token,{httpOnly:true, maxAge:3600000});
        return res.status(200).json({message: 'Logged in successfull'});

    } catch (error) {
        return next(errorHandler(500, error.message));
    }
}