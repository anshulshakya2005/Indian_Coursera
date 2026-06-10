const nodemailer = require("nodemailer")
require("dotenv").config();


const mailsender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"Indian Coursera" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.log("Mail error:", error.message);
    throw error;
  }
};

module.exports = mailsender;