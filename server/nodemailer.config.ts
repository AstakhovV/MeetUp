import nodemailer from "nodemailer";

const { NODE_MAIL: user, NODE_MAILER_APP: pass } = process.env;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

const sendConfirmationEmail = (name, email, confirmationCode) =>
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Your confirmation code <b>${confirmationCode}</b></p>
        </div>`,
  }).catch((err) => console.log(err));

export { sendConfirmationEmail };
