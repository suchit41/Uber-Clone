import express from "express";
import { body } from "express-validator";
import { captainLogin, registerCaptain,getCaptainProfile, getCaptainLogout } from "../Controller/captain.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();




router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname'),
    body('password'),
    body('vehicle.color'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
],
    registerCaptain
)


router.post('/login',
    body('email').isEmail().withMessage('Invalid Email'),
    body('password'),
    captainLogin
)



router.get('/profile',authMiddleware.authCaptain, getCaptainProfile)

router.get('/logout',authMiddleware.authCaptain,getCaptainLogout)

