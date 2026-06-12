import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./Router/user.router.js";
import ConnectToDB from "./db/db.js";

dotenv.config();

const app = express();

ConnectToDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/users", userRouter);

export default app;