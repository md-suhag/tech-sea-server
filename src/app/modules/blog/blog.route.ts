import express from "express";
import { BlogControllers } from "./blog.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createBlogSchema,
  reactToBlogSchema,
  updateBlogSchema,
} from "./blog.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { singleImageUpload } from "../../config/multer";

const router = express.Router();

router.post(
  "/",
  checkAuth(...Object.values(Role)),
  singleImageUpload,
  validateRequest(createBlogSchema),
  BlogControllers.createBlog
);

router.get("/", BlogControllers.getAllBlogs);
router.get("/:slug", BlogControllers.getSingleBlog);
router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  singleImageUpload,
  validateRequest(updateBlogSchema),
  BlogControllers.updateBlog
);
router.delete(
  "/:id",
  checkAuth(...Object.values(Role)),
  BlogControllers.deleteBlog
);
router.get("/:id/comments", BlogControllers.getCommentsOfBlog);

router.post(
  "/:id/react",
  checkAuth(...Object.values(Role)),
  validateRequest(reactToBlogSchema),
  BlogControllers.reactToBlog
);
export const blogRoutes = router;
