const nodemailer = require("nodemailer");

module.exports = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: html,
    });
    return {
      success: true,
      message: "OTP sent successfully !",
    };
  } catch (error) {
    console.log(error, "email not sent");
  }
};
