const express=require('express');
const router=express.Router();
const User = require('../models/user');

router.post('/signup', async (req, res) => {
  const { token } = req.body
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    })
    const payload = ticket.getPayload()
    const { name, email } = payload
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }
    user = await User.create({
      name,
      email,
      location: ''
    })
    const jwtToken = generateToken(user)
    res.status(201).json({
      message: 'Signup successful',
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } 
  catch (err) {
    res.status(401).json({ message: 'Invalid Google token' })
  }
})
router.post('/login', async (req, res) => {
  const { token } = req.body

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    })

    const payload = ticket.getPayload()
    const { email } = payload

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not found, please sign up' })
    }

    const jwtToken = generateToken(user)

    res.status(200).json({
      message: 'Login successful',
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (err) {
    res.status(401).json({ message: 'Invalid Google token' })
  }
})

