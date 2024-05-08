import { Router } from "express";

import {
  registerUser,
  loginUser,
  logOutUser,
} from "../Controllers/authenticationController.js";

//middleware

import {
  validateInputRegister,
  validateInputLogin,
} from "../Middlewares/validationMiddleware.js";

const routerAuthentication = Router();

routerAuthentication
  .route("/register")
  .post(validateInputRegister, registerUser);
routerAuthentication.route("/login").post(validateInputLogin, loginUser);
routerAuthentication.route("/logout").get(logOutUser);

export default routerAuthentication;
