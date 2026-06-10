import mongoose from "mongoose";
import userModel from "../Model/user.model";
import userService from "../Services/user.service";
import createUser from "../Services/user.service"
const { validationResult } = require('express-validator');



export default register =async (req,res,next)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(200).json({
            errors: errors.array()
        })
    }

    const {fullname, email, password } = req.body;

    const isUserAlready = userModel.findOne({email})

    if(isUserAlready){
        return res.status(401).json({
            message: "user already exist"
        })
    };

    const hashpassword = await userModel.hashpassword(password);


    const user = userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    const token = user.generateAuthToken();

    res.status(201).json({ token, user });

}
