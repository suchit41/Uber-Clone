import mongoose from "mongoose";
import userModel from "../Model/user.model.js";
import createUser from "../Services/user.service.js"
import { validationResult } from 'express-validator';



export const registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { fullname, email, password } = req.body;


   const isUserAlready = await userModel.findOne({ email });

    if (!isUserAlready) {
        return res.status(401).json({
            message: "User already exists"
        });
    }

    const hashedPassword =
        await userModel.hashpassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({
        token,
        user
    });
};

export const loginUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, password } = req.body;

    const user = await userModel
        .findOne({ email })
        .select("+password");

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const isMatch =
        await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);

    res.status(200).json({
        token,
        user
    });
};

export const getUserProfile  = async (req, res, next)=>{
        res.status(200).json(req.user);

} 

export const blackListToken = async (req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });
}



