import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { PRIVATE_KEY } from "../utils/jwt.js";

const cookieExtractor = (req) => {
  let token = null;
  if (req?.cookies) token = req.cookies["coderCookieToken"];
  return token;
};

export const initializePassport = () => {
  passport.use(
    "current",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload.user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
