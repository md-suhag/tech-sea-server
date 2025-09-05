import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { BlogServices } from "./blog.service";

import { IBlog } from "./blog.interface";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;

  if (!req.file) {
    throw new AppError(httpStatus.BAD_REQUEST, "Blog Image is required");
  }
  const payload: IBlog = {
    ...req.body,
    author: decodedToken.userId,
    imageUrl: req.file?.path,
  };
  const blog = await BlogServices.createBlog(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog created Successfully",
    data: blog,
  });
});
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await BlogServices.getAllBlogs(
    query as Record<string, string>
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blogs retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const blog = await BlogServices.getSingleBlog(slug);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog retrieved Successfully",
    data: blog,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const decodedToken = req.user as JwtPayload;

  const imgUrl = req.file?.path;
  if (imgUrl) {
    req.body.imageUrl = imgUrl;
  }

  const updatedBlog = await BlogServices.updateBlog(id, req.body, decodedToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated Successfully",
    data: updatedBlog,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const decodedToken = req.user as JwtPayload;

  await BlogServices.deleteBlog(id, decodedToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog deleted Successfully",
    data: null,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
