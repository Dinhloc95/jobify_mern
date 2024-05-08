import {
  BadRequestError,
  UnauthenticatedError,
} from "../Errors/customErrors.js";
import User from "../Models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { createToken } from "../utils/tokenUtils.js";

export const registerUser = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const loginUser = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) throw new UnauthenticatedError("invalid credentials");

  const isCorrectPassword = await comparePassword(
    req.body.password,
    user.password
  );
  if (!isCorrectPassword) throw new UnauthenticatedError("Password was Wrong");

  const token = createToken({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    expires: new Date(Date.now() + oneDay),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "login successful" });
};
export const logOutUser = async (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(StatusCodes.OK).json({ msg: "logout successful" });
};
