import mongoose from "mongoose";
import captainModel from "../Model/captain.model";
import { validationResult } from "express-validator";
import { createCaptain } from "../Services/captain.service";
import { blackListToken } from "./user.controller";
import blackListTokenModel from "../Model/blackListToken.model";


export const registerCaptain = async (req, res,next) =>{

    const errors = validationResult()

    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        })
    }

    const {fullname, email, password, vehicle } = req.body;

   const isCaptainAlreadyExist = await captainModel.findOne({email});

   if (isCaptainAlreadyExist){

    return res.status(401).json({
        message:"Captain already exist"
    })
   }

   const captain = await createCaptain({
    irstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleTyp
   });

const token = captainModel.generateToken();
res.status(201).json({
    token,
    captain
})

}


export const captainLogin = async (req,res,next)=>{

    const errors = validationResult()

    if(errors.isEmpty()){
        return res.status(400).json({
            error : errors.array()
        })
    }


    const {email,password } = req.body;


    const captain = captainModel.findOne({email}).select("+password");

    if(!captain){
        return res.status(402).json({
            message: "Invalid email or password"
        })
    }

const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

     const token = captain.generateAuthToken();

    res.cookie("token", token);

    res.status(200).json({
        token,
        captain
    });

}


export const getCaptainProfile = async (req, res,next) =>{
    res.status(200).json({ captain: req.captain });
}


export const getCaptainLogout = async(req,res,next) =>{

    const token = req.cookie.token || req.header.authorization?.split(' ')[ 1 ];

    await blackListTokenModel.create({token});
    res.status(201).json({ message: 'Logged out' });

} 




