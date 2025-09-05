import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { CommentService } from "./comment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user;
  const payload = req.body;
  const result = await CommentService.createComment(
    payload,
    decodedToken as JwtPayload
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment Created successfully",
    data: result,
  });
});

export const CommentController = {
  createComment,
};
