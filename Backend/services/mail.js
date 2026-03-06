const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
 auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
});
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: "sobhika1105@gmail.com",
      to: to,
      subject: subject,
      html: text,
      messageId: `<${Date.now()}@yourdomain.com>`, 
      headers: {
        'X-Entity-Ref-ID': Date.now().toString() }

    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("Email error:", error);
  }
};
module.exports = sendEmail;