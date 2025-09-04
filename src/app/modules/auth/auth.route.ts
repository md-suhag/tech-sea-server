import express, { NextFunction, Request, Response } from "express";
import { AuthControllers } from "./auth.controller";
import { validateRequest } from "./../../middlewares/validateRequest";
import {
  forgotPasswordSchema,
  loginSchma,
  registerSchema,
  resetPasswordSchema,
} from "./auth.validation";
import passport from "passport";
import { envVars } from "../../config/env";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();
router.post(
  "/register",
  validateRequest(registerSchema),
  AuthControllers.createUser
);
router.post("/login", validateRequest(loginSchma), AuthControllers.login);
router.post("/logout", AuthControllers.logout);
router.post("/refresh-token", AuthControllers.getNewAccessToken);
router.post("/verify", AuthControllers.verifyAccount);

router.post(
  "/forgot-password",
  validateRequest(forgotPasswordSchema),
  AuthControllers.forgotPassword
);
router.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  validateRequest(resetPasswordSchema),
  AuthControllers.resetPassword
);
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
