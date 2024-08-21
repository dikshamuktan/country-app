import express from "express";

import{
    registerUser,
    loginUser
} from "../controller/user.controller.js";

import authenticateUser from "../middleware/auth.middleware.js";

const userRouter= express.Router();


userRouter
.post("/register",registerUser)
.post("/login",authenticateUser,loginUser)

export default userRouter;