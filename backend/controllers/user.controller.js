import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

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