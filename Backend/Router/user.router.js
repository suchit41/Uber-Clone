import express from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  getUserProfile,
  blackListToken
} from "../Controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid Email"),

    body("fullname.firstname"),

    body("password")
      .isLength({ min: 6 })
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid Email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
  ],
  loginUser
);

router.post("/logout", authMiddleware.authUser,blackListToken);

router.get("/get-profile",authMiddleware.authUser, getUserProfile);

export default router;