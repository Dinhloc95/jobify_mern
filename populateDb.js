import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Jobs from "./Models/jobModel.js";
import Users from "./Models/UserModel.js";

try {
  await mongoose.connect(process.env.MONGO_URL);

  const user = await Users.findOne({ email: "loc@gmail.com" });
  const jobJson = JSON.parse(
    await readFile(new URL("./utils/MOCK_DATA.json", import.meta.url))
  );

  const jobs = jobJson.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Jobs.deleteMany({ createdBy: user._id });
  await Jobs.create(jobs);
  console.log("successful");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
