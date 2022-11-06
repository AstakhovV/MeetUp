import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from '../../models/user';
import { UserData } from "../../domain/user";
import passport from "passport";
import { generateCode } from "../../utils/generateCode";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CALLBACK_URL } = process.env;

passport.use('google', new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
  },
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      let userData: UserData;
      const email = profile.emails[0].value;
      const obj = {
        fullName: profile.displayName,
        avatarUrl: profile.photos[0].value,
        isActive: false,
        email,
        confirmationCode: generateCode(),
        userName: profile.displayName,
        status: "Pending",
      };

      const findUser = await User.findOne({ where: { email }, attributes: {
            exclude: ['confirmationCode'],
        } });

      if (!findUser) {
        const user = await User.create(obj);
        delete user.confirmationCode;
        userData = user.toJSON();
      } else {
        userData = await findUser.toJSON();
      }
      done(null, userData);
    } catch (error) {
      done(error);
    }
  },
));

// @ts-ignore
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export { passport };
