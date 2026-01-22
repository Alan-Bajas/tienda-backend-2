import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import UserModel from "../models/user.model.js";
import { isValidPassword } from "../utils/password.js";

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.coderCookieToken;
  }
  return token;
};

export const initializePassport = () => {

  // 🔐 LOGIN con Passport Local
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          if (!user) return done(null, false);

          if (!isValidPassword(user, password)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // 🔑 JWT para rutas protegidas
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload, done) => {
        try {
          const user = await UserModel.findById(jwtPayload.user._id).lean();
          if (!user) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
