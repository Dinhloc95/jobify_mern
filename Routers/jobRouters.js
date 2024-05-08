import { Router } from "express";
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../Controllers/jobControllers.js";
import {
  validateInput,
  validateIdParam,
} from "../Middlewares/validationMiddleware.js";

const routerJobs = Router();

routerJobs.route("/").get(getAllJobs).post(validateInput, createJob);
routerJobs.route("/stats").get(showStats);
routerJobs
  .route("/:id")
  .patch(validateInput, validateIdParam, updateJob)
  .get(validateIdParam, getJob)
  .delete(validateIdParam, deleteJob);

export default routerJobs;
