import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { StatsService } from "./stats.service";

const getBlogStats = catchAsync(async (req: Request, res: Response) => {
  const stats = await StatsService.getBlogStats();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog stats fetched successfully",
    data: stats,
  });
});

export const StatsController = { getBlogStats };
