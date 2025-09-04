import express from "express";
import { UserControllers } from "./user.controller";

import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = express.Router();

router.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe);

export const userRoutes = router;
