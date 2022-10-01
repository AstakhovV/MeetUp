import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from '../../models/user';
import { UserData } from "../../domain/user";

passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      let userData: UserData;
      const obj = {
        fullName: profile.displayName,
        avatarUrl: profile.photos[0].value,
        isActive: false,
        phoneNumber: '',
        userName: profile.displayName,
      };

      const findUser = await User.findOne({
        where: {
          userName: profile.displayName,
        },
      });

      if (!findUser) {
        const user = await User.create(obj);
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
