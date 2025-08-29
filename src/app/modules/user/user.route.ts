import express from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { registerSchema } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  UserControllers.createUser
);

export const userRoutes = router;
