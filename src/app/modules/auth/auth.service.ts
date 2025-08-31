/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { generateToken, verifyToken } from "../../utils/jwt";
import { createNewAcccessTokenWithRefreshToken } from "../../utils/userTokens";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { sendEmail } from "../../utils/sendEmail";
import bcrypt from "bcryptjs";

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAcccessTokenWithRefreshToken(
    refreshToken
  );
  return {
    accessToken: newAccessToken,
  };
};

const verifyAccount = async (activationToken: string) => {
  const result = verifyToken(
    activationToken,
    envVars.ACTIVATION_SECRET
  ) as JwtPayload;
  const user = await User.findById(result.id);
  if (user?.isVerified) {
    throw new AppError(400, "User already verified");
  }
  await User.findByIdAndUpdate(result.id, {
    isVerified: true,
  });

  return null;
};

const fogotPassword = async (email: string) => {
  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
  }
  if (!isUserExist.isVerified) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is not verified");
  }
  if (isUserExist.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, `User is blocked`);
  }

  const resetToken = generateToken(
    { id: isUserExist._id, email: isUserExist.email, role: isUserExist.role },
    envVars.JWT_ACCESS_SECRET,
    "10m"
  );

  const resetLink = `${envVars.FRONTEND_URL}/reset-password?id=${isUserExist.id}&token=${resetToken}`;

  sendEmail({
    to: isUserExist.email,
    subject: "Password Reset",
    templateName: "forgetPassword",
    templateData: {
      name: isUserExist.name,
      resetLink,
    },
  });
};

const resetPassword = async (
  payload: Record<string, any>,
  decodedToken: JwtPayload
) => {
  if (payload.id != decodedToken.id) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You can not reset your password"
    );
  }

  const isUserExist = await User.findById(decodedToken.id);
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist");
  }

  if (payload.newPassword.length < 6) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Password must be at least 6 characters long"
    );
  }
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  return await User.findByIdAndUpdate(
    decodedToken.id,
    {
      password: hashedPassword,
    },
    { runValidators: true, new: true }
  );
};
export const AuthServices = {
  getNewAccessToken,
  verifyAccount,
  fogotPassword,
  resetPassword,
};
