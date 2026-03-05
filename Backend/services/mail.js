const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sobhika1105@gmail.com",     
    pass: "gqijogfuwoilxhzl"        
  }
});
const sendEmail = async (to, subject, text) => {
  try {

    const mailOptions = {
      from: "sobhika1105@gmail.com",
      to: to,
      subject: subject,
      text: text
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);

  } catch (error) {
    console.log("Email error:", error);
  }
};
module.exports = sendEmail;