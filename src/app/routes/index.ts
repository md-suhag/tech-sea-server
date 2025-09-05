import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { blogRoutes } from "../modules/blog/blog.route";
import { commentRoutes } from "../modules/comment/comment.route";

export const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/blogs",
    route: blogRoutes,
  },
  {
    path: "/comments",
    route: commentRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
