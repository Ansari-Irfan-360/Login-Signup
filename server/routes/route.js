import express from "express";
import {signupUser,loginUser} from '../controller/user-controller.js';

const Router = express.Router();

Router.post('/signup',signupUser)
Router.post('/login',loginUser)

export default Router;