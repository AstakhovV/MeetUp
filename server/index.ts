import express from 'express';
import session from 'express-session';
import "./config";
import multer from "multer";
import cors from "cors";
import sharp from "sharp";
import fs from 'fs';
import { nanoid } from "nanoid";
import { sequelize } from "./core/db";
import { passport } from "./core/google";
import { User } from "../models/user";
import { sendConfirmationEmail } from "./nodemailer.config";

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, 'public/avatars'),
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}-${nanoid(10)}.${file.mimetype.split('/').pop()}`),
});

const upload = multer({ storage });

const app = express();
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.post('/upload', upload.single('photo'), function (req, res) {
  const filePath = req.file.path;
  sharp(filePath)
    .resize(150, 150)
    .toFormat('jpeg')
    .toFile(filePath.replace('.png', '.jpeg'), (err) => {
      if (err) {
        throw err;
      }

      fs.unlinkSync(filePath);

      res.json({
        url: `/avatars/${req.file.filename.replace('.png', '.jpeg')}`,
      });
    });
});

app.post('/auth/code', async (req) => {
  const { confirmationCode, userName } = await User.findOne({ where: { email: req.body.email } });
  await sendConfirmationEmail(userName, req.body.email, confirmationCode);
});

app.post('/auth/verify-code', async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (user) {
    if (user.confirmationCode === req.body.code){
      const updatedUser = await user.update({ status: "Active" });

      return res.json({ user: updatedUser });
    } {
      return res.json({ user: null });
    }
  }
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ["email", "profile"] }));

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
  await sequelize.authenticate();
  await sequelize.sync();
});
