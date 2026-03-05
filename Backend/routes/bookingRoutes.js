const jwt = require("jsonwebtoken");
const express=require('express');
const Appointment = require("../models/Appointment");
const User = require("../models/user");
const router=express.Router();
const sendEmail = require("../services/mail");

router.post("/book", async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      console.warn("booking attempt without token");
      return res.status(401).json({ message: "No token provided" });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      console.warn("invalid token", e.message);
      return res.status(401).json({ message: "Invalid token" });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("TOKEN:", token);
    console.log("VERIFY SECRET:", process.env.JWT_SECRET);
    const {
      petType,
      preferredDate,
      preferredTime,
      amount
    } = req.body;
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
      message: "Appointment booked successfully"
      
    });
    
  } catch (err) {
    console.error("booking error:", err);
    res.status(400).json({ message: err.message || "Booking failed" });
  }
});

router.post("/email",async(req,res)=>{
  const { email, name, petType, preferredDate, preferredTime } = req.body;

  try {
     sendEmail(
      user.email,
      "Appointment Confirmed 🐶",
      `Hi ${user.name},

      Lovely! Your appointment is successfully booked.

      Pet Type: ${petType}
      Date: ${preferredDate}
      Time: ${preferredTime}

      Thank you for choosing our PetCare service.`
        );
    } catch (emailErr) {
      console.log("Email failed:", emailErr.message);
    }
})
module.exports=router;