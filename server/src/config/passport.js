import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Configure GitHub Strategy
const githubId = process.env.GITHUB_CLIENT_ID;
if (githubId && githubId !== 'mock_github_client_id') {
  passport.use(
    new GitHubStrategy(
      {
        clientID: githubId,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: ['user:email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
          let user = await User.findOne({ $or: [{ providerId: profile.id, provider: 'github' }, { email }] });
          
          if (!user) {
            // First user could be admin
            const userCount = await User.countDocuments();
            user = await User.create({
              name: profile.displayName || profile.username,
              email: email,
              avatar: profile.photos?.[0]?.value || '',
              provider: 'github',
              providerId: profile.id,
              role: userCount === 0 ? 'admin' : 'user',
              plan: 'free',
            });
          } else {
            // Ensure provider matches
            user.providerId = profile.id;
            user.provider = 'github';
            if (profile.photos?.[0]?.value) {
              user.avatar = profile.photos[0].value;
            }
            await user.save();
          }
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
} else {
  console.log('GitHub OAuth: Using Mock Strategy / bypass authentication');
}

// Configure Google Strategy
const googleId = process.env.GOOGLE_CLIENT_ID;
if (googleId && googleId !== 'mock_google_client_id') {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleId,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          let user = await User.findOne({ $or: [{ providerId: profile.id, provider: 'google' }, { email }] });

          if (!user) {
            const userCount = await User.countDocuments();
            user = await User.create({
              name: profile.displayName,
              email: email,
              avatar: profile.photos?.[0]?.value || '',
              provider: 'google',
              providerId: profile.id,
              role: userCount === 0 ? 'admin' : 'user',
              plan: 'free',
            });
          } else {
            user.providerId = profile.id;
            user.provider = 'google';
            if (profile.photos?.[0]?.value) {
              user.avatar = profile.photos[0].value;
            }
            await user.save();
          }
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
} else {
  console.log('Google OAuth: Using Mock Strategy / bypass authentication');
}
export default passport;
