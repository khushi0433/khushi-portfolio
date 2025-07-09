const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

// 👉 Replace with your real Gmail credentials
const gmailEmail = "fatimahbaloch917@gmail.com";
const gmailPassword = "wpfo tvlk uvkl dvui"; // See note below

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Only POST allowed");
    }

    const { name, email, message } = req.body;

    const mailOptions = {
      from: email,
      to: gmailEmail,
      subject: `New message from ${name}`,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).send("Message sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Something went wrong");
    }
  });
});
