/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import passport from "passport";
import AppError from "../../errorHelpers/AppError";
import { createUserTokens } from "../../utils/userTokens";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookie";
import { envVars } from "../../config/env";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    passport.authenticate("local", async (err: any, user: any, info: any) => {
      if (err) {
        return next(new AppError(401, err));
      }
      if (!user) {
        return next(new AppError(401, info.message));
      }
      const userTokens = await createUserTokens(user);

      const { password: pass, ...rest } = user.toObject();

      setAuthCookie(res, userTokens);
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: {
          user: rest,
        },
      });
    })(req, res, next);
  }
);
const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Logged out successfully",
    data: null,
  });
});
const googleCallbackController = catchAsync(
  async (req: Request, res: Response, nex: NextFunction) => {
    let redirectTo = req.query.state ? (req.query.state as string) : "";
    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }

    const user = req.user;

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const tokenInfo = createUserTokens(user);
    setAuthCookie(res, tokenInfo);

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
  }
);
export const AuthControllers = {
  login,
  logout,
  googleCallbackController,
};
