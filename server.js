import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
//routers
import routerJobs from "./Routers/jobRouters.js";
import routerAuthentication from "./Routers/authenticationRouter.js";
import routerUser from "./Routers/userRouter.js";
//public

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//Middleware
import ErrorMiddleware from "./Middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./Middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cookieParser());

app.use("/api/v1/jobs", authenticateUser, routerJobs);

app.use("/api/v1/auth", routerAuthentication);

app.use("/api/v1/users", authenticateUser, routerUser);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});
app.use("*", (req, res) => {
  return res.status(404).json({ msg: "not found Url" });
});

app.use(ErrorMiddleware);
app.get("/", (req, res) => {
  res.send("hello word!!!");
});

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log("server is running...");
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
