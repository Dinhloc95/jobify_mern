import { Router } from "express";
import {
  getCurrentUser,
  updateUser,
  getApplicationStats,
} from "../Controllers/userController.js";
import { validateUpdateUserInput } from "../Middlewares/validationMiddleware.js";
import { authorizePermission } from "../Middlewares/authMiddleware.js";
import upload from "../Middlewares/multerMiddleware.js";

const route = Router();

route.route("/current-user").get(getCurrentUser);
route
  .route("/admin/app-stats")
  .get([authorizePermission("admin"), getApplicationStats]);
route
  .route("/update-user")
  .patch(upload.single("avatar"), validateUpdateUserInput, updateUser);

export default route;
