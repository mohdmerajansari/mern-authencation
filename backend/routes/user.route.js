import express from "express";
import { logIn, signUp } from "../Controller/user.controller.js";
import { loginValidation, signupValidation } from "../middleware/authValidataion.js";
const userRouter = express.Router();

userRouter.post("/signup", signupValidation ,signUp)
userRouter.post("/login", loginValidation ,logIn)

export default userRouter;