import express, { NextFunction, Request, Response } from "express";
import { AuthControllers } from "./auth.controller";
import { validateRequest } from "./../../middlewares/validateRequest";
import { loginSchma } from "./auth.validation";
import passport from "passport";
import { envVars } from "../../config/env";

const router = express.Router();

router.post("/login", validateRequest(loginSchma), AuthControllers.login);
router.post("/logout", AuthControllers.logout);
router.post("/refresh-token", AuthControllers.getNewAccessToken);
router.post("/verify", AuthControllers.verifyAccount);
router.get(
  "/google",
  async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/";
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: redirect as string,
    })(req, res, next);
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${envVars.FRONTEND_URL}/login?error=There is some issues with your account. Please contact with out support team!`,
  }),
  AuthControllers.googleCallbackController
);

export const authRoutes = router;
