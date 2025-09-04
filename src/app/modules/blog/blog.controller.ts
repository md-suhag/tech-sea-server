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

export const BlogControllers = {
  createBlog,
};
