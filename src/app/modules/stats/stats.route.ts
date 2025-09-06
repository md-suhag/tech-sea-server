import express from "express";
import { StatsController } from "./stats.controller";

const router = express.Router();

router.get("/blog", StatsController.getBlogStats);
export const statsRoutes = router;
