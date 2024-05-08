import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../Errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import Job from "../Models/jobModel.js";
import User from "../Models/UserModel.js";
import mongoose from "mongoose";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);
        if (errorMessage[0].startsWith("no job")) {
          throw new NotFoundError(errorMessage);
        }
        if (errorMessage[0].startsWith("no authorize")) {
          throw new UnAuthorizedError("no authorize to access jobs");
        }
        throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};
export const validateInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status input"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type input"),
  body("jobLocation").notEmpty().withMessage("Job Location is required"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const checkIdMongoose = mongoose.Types.ObjectId.isValid(value);
    if (!checkIdMongoose) throw new BadRequestError("invalid ID mongoose");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with ${value}`);
    const isAdmin = req.user.role === "admin";
    const isUser = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isUser) {
      throw new UnAuthorizedError("no authorize to access jobs");
    }
  }),
]);

export const validateInputRegister = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("email already exist");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 character long"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("location").notEmpty().withMessage("location is required"),
]);

export const validateInputLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  body("password").notEmpty().withMessage("passWord is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId)
        throw new BadRequestError("email already exist");
    }),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("location").notEmpty().withMessage("location is required"),
]);
