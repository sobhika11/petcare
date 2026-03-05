const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const mongoose=require('mongoose');
const Appointment = require('../models/Appointment');
const User = require("../models/user");
router.get("/profile", async (req, res) => {

  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided"
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    const profile=await User.findById(decoded.id).select("-password");
    if (!profile) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    console.log(profile+" "+profile);
    res.json(profile);
  } catch (err) {
    res.status(401).json({
      message: "Invalid token"
    });
  }
});

router.get('/receipt', async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use decoded.id from the token to find only this user's appointments
    const history = await Appointment.find({ userId: decoded.id });
    res.status(200).json({ success: true, data: history });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
});

module.exports = router;