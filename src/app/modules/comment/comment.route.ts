import express from "express";
import { CommentController } from "./comment.controller";
import { checkAuth } from "./../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createCommentSchema } from "./comment.validation";

const router = express.Router();

router.post(
  "/",
  checkAuth(...Object.values(Role)),
  validateRequest(createCommentSchema),
  CommentController.createComment
);

export const commentRoutes = router;
