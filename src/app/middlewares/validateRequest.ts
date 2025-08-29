import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import httpStatus from "http-status-codes";

export const validateRequest = (zodSchema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body?.data) {
        req.body = JSON.parse(req.body.data);
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: "Request body is missing or empty.",
        });
      }

      req.body = await zodSchema.parseAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
};
