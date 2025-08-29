/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import {
  Strategy as GoogleStategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
          return done("User does not exist");
        }

        if (!isUserExist.isVerified) {
          return done("User is not verified");
        }

        if (isUserExist.isBlocked === true) {
          return done(`User is blocked`);
        }

        const isGoogleAuthenticated = isUserExist.auths.some(
          (providerObjects) => providerObjects.provider == "google"
        );
        if (isGoogleAuthenticated && !isUserExist.password) {
          return done(null, false, {
            message:
              "You have auhthenticated by Google. So if you want to login with credentials, then at first login with google and set a password for your Gmail and then you can login with email and password",
          });
        }
        const ispasswordMatched = await bcrypt.compare(
          password,
          isUserExist?.password as string
        );
        if (!ispasswordMatched) {
          return done(null, false, { message: "Password does not match" });
        }

        return done(null, isUserExist);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(null, false, { message: "No email found" });
        }

        let isUserExist = await User.findOne({ email });

        if (isUserExist && !isUserExist.isVerified) {
          return done(null, false, { message: "User is not verified" });
        }

        if (isUserExist && isUserExist.isBlocked === true) {
          return done(null, false, {
            message: `User is blocked`,
          });
        }

        if (!isUserExist) {
          isUserExist = await User.create({
            email,
            name: profile.displayName,
            role: Role.USER,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }
        return done(null, isUserExist);
      } catch (error) {
        console.log("Google Strategy Error", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
});
