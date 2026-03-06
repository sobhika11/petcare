const jwt = require("jsonwebtoken");
const express = require('express');
const Appointment = require("../models/Appointment");
const User = require("../models/user");
const router = express.Router();
const sendEmail = require("../services/mail"); 
router.post("/book", async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { petType, preferredDate, preferredTime, amount } = req.body;

    const appointment = new Appointment({
      ownerName: user.name,
      email: user.email,
      petType,
      preferredDate,
      preferredTime,
      amount,
      userId: user._id
    });

    await appointment.save();
    res.status(201).json({
      message: "Appointment booked successfully",
      email: user.email,
      name: user.name
    });

  } catch (err) {
    console.error("Booking error:", err);
    res.status(400).json({ message: err.message || "Booking failed" });
  }
});

router.post("/email", async (req, res) => {
  const { email, name, petType, preferredDate, preferredTime } = req.body;
  const uniqueId = Date.now().toString().slice(-6); 
  const uniqueSubject = `Appointment Confirmed 🐶 [#${uniqueId}]`;
  try {
    await sendEmail(
  email,
  uniqueSubject,
  `
  <div style="font-family: Arial, sans-serif; line-height:1.6;">
    <h2 >Appointment Confirmed 💕</h2>

    <p>Hi <b>${name}</b>,</p>

    <p>
      Happy to share that your appointment for <b>${petType}</b> on 
      <b>${preferredDate}</b> at <b>${preferredTime}</b> 
      has been successfully booked.
    </p>

    <p>
      We are looking forward to your visit and hope you have a wonderful
      experience with our PetCare service.
    </p>

    <p>Have a happy day!🍃</p>

    <p>
      Thank you,<br>
      <b>PetCare Team</b>
    </p>
  </div>
  `
);
    res.status(200).json({ success: true, message: "Email sent" });
  } catch (emailErr) {
    res.status(500).json({ success: false });
  }
});
module.exports = router;