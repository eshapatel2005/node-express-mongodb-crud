const nodemailer = require("nodemailer");
exports.sendEmail = async (mailObj) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.FROM_MAIL,
        pass: process.env.USER_PASS,
      },
    });

    const result = await transporter.sendMail(mailObj);
    console.log("email sent", result);
  } catch (error) {
    console.log("email not sent", error);
  }
};