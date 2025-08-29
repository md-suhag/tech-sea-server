import { createNewAcccessTokenWithRefreshToken } from "../../utils/userTokens";

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAcccessTokenWithRefreshToken(
    refreshToken
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthServices = {
  getNewAccessToken,
};
