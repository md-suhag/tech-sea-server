import express from "express";
import { BlogControllers } from "./blog.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBlogSchema } from "./blog.validation";
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

export const blogRoutes = router;
