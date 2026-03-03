const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
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
    console.log(decoded);
    const profile = await User.findById(decoded.id)
      .select("-password");
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

module.exports = router;