import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { verifyToken } from "../../utils/jwt";
import { createNewAcccessTokenWithRefreshToken } from "../../utils/userTokens";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";

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
export const AuthServices = {
  getNewAccessToken,
  verifyAccount,
};
