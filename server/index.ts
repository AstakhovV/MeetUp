import express from 'express';
import session from 'express-session';
import dotenv from "dotenv";

dotenv.config({
  path: 'server/.env',
});

import { passport } from "./core/google";
import {sequelize} from "./core/db";

const app = express();

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/google',
  passport.authenticate('google', { scope: ["profile", "email"] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send(
      `<script>window.opener.postMessage('${JSON.stringify(
        req.user,
      )}', '*');window.close();</script>`,
    );
  });

app.listen(3001, async () => {
  await sequelize.authenticate()
  await sequelize.sync()
});
