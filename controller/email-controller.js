const nodemailer = require("nodemailer");
const asyncHandler=require("express-async-handler")

const sendEmail =asyncHandler (async (data,req, res) => {
  try {
    const transporter = nodemailer.createTransport({
     service:"gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
        // ethereal credentials
        // user: "bennett.collier6@ethereal.email",
        // pass: "H6ZvjpdsWvsTR7rJsv",
      },
    });
    const info = {
      from: "'HEY 👋👋' maryamzarnab61@gmail.com",
      to: data.to,
      subject: data.subject,
      text:  data.text,
      html: data.html,
    };
    transporter.sendMail(info, (error, info) => {
      if (error) {
        console.log("Error", error);
      } else {
        console.log("Email Sent " , info.response);
        res.status(201).json({ status: 201, info });
      }
    });

    console.log("Message sent: %s", info.messageId);
    console.log("preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    throw new Error(error);
  }
})

module.exports = sendEmail;
