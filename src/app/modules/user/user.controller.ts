import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { createActivationUrl } from "../../utils/createActivationUrl";
import { sendEmail } from "../../utils/sendEmail";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await UserServices.createUserIntoDB(userData);

  const activationUrl = createActivationUrl(user);

  await sendEmail({
    to: user.email,
    subject: "Verification Link",
    templateName: "verifyEmail",
    templateData: { name: user.name, activationUrl },
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: `Please check your email : ${user.email} to verify your account.`,
    data: null,
  });
});

export const UserControllers = {
  createUser,
};
