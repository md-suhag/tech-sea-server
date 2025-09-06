import express from "express";
import { StatsController } from "./stats.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

router.get(
  "/blog",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  StatsController.getBlogStats
);
router.get(
  "/user",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  StatsController.getUserStats
);
export const statsRoutes = router;
