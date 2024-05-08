import { StatusCodes } from "http-status-codes";
import User from "../Models/UserModel.js";
import Job from "../Models/jobModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
export const getCurrentUser = async (req, res) => {
  const userInformation = await User.findOne({ _id: req.user.userId });
  const user = userInformation.toJSON();
  res.status(StatusCodes.OK).json({ user });
};
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};
export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updateUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updateUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "update user successful" });
};
