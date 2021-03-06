import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';

import models from '../models/index';
import configJwt from '../config/configJwt';
import configGoogle from '../config/configGoogle';
import { signToken } from '../helpers/auth';

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const JwtStrategy = passportJWT.Strategy;
const LocalStrategy = passportLocal.Strategy;

const { ExtractJwt } = passportJWT;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = configJwt.secret;

passport.use(
  new JwtStrategy(jwtOptions, (payload, next) => {
    models.Users.findOne({
      where: {
        id: payload.user
      }
    }).then(user => {
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
  })
);

passport.use(
  new LocalStrategy(
    { usernameField: 'login', passwordField: 'password', session: false },
    (email, password, next) => {
      models.Users.findOne({
        where: {
          email
        }
      })
        .then(user => {
          const hash =
            crypto
              .createHash('md5')
              .update(password)
              .digest('hex') === user.password;
          if (hash && user) {
            const token = signToken(user.id);
            return next(null, user, {
              message: 'Login success',
              token,
              status: 200
            });
          }
          if (!hash) {
            return next(null, false, {
              message: 'Data entered incorrectly',
              status: 403
            });
          }
          return next(null, false);
        })
        .catch(() => {
          next(null, false, {
            message: 'Data entered incorrectly',
            status: 401
          });
        });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: configGoogle.clientID,
      clientSecret: configGoogle.clientSecret,
      callbackURL: configGoogle.callbackURL
    },
    (accessToken, refreshToken, profile) => {
      console.log('aaaaaaaaaaaaaa', profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: configGoogle.clientID,
      clientSecret: configGoogle.clientSecret,
      callbackURL: configGoogle.callbackURL
    },
    (request, accessToken, refreshToken, profile, emails, done, next) => {
      console.log('aaaaaaaaaaaaaa', refreshToken);
      models.Users.findOne({
        where: { email: refreshToken.emails[0].value }
      }).then(user => {
        console.log('user', user);
        if (user) {
          const token = signToken(user.id);
          console.log('login', user);
          console.log('token', token);
          done(null, user, {
            message: 'Login success',
            token,
            status: 200
          });
        } else {
          models.Users.build({ email: refreshToken.emails[0].value })
            .save()
            .then(user => {
              const token = signToken(user.id);
              console.log('userCreate', user);
              console.log('token', token);
              done(null, user, {
                message: 'Login success',
                token,
                status: 200
              });
            });
        }
      });
    }
  )
);

export default passport;
