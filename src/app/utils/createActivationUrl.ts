import { IUser } from "../modules/user/user.interface";
import { envVars } from "../config/env";
import { generateToken } from "./jwt";
export const createActivationUrl = (user: Partial<IUser>) => {
  const token = generateToken(
    { id: user._id },
    envVars.ACTIVATION_SECRET,
    "5m"
  );
  return `${process.env.FRONTEND_URL}/activate/${token}`;
};
