import User from "../models/user.model.js";

export const createUser = async(req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password) return res.status(400).json({message:'All fields are mandatory'});

        const user = await User.findOne({username, email});
        if(user) return res.status(409).json({message: 'User already found'});

        const userDetails = new User({
            username,
            email,
            password
        });

        await userDetails.save();
        return res.status(201).json(userDetails);

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}