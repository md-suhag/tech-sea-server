import express from "express";
import { AuthControllers } from "./auth.controller";
import { validateRequest } from "./../../middlewares/validateRequest";
import { loginSchma } from "./auth.validation";
const router = express.Router();

router.post("/login", validateRequest(loginSchma), AuthControllers.login);

export const authRoutes = router;
