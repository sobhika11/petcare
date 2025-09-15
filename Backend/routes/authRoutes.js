const express=require('express');
const router=express.Router();
const { OAuth2Client } = require('google-auth-library');
const User=require('../models/user');
const client=new OAuth2Client(process.env.CLIENT_ID);
router.post('/google',async (req,res)=>
{
    const{token}=req.body;
    try{
        const ticket=await client.verifyIdToken({
            idToken:token,
            audience:process.env.CLIENT_ID
        });
    const payload = ticket.getPayload();
    const { name, email } = payload;
    let user=await User.findOne({email});
    if(!user)
    {
        user=await User.create({
            name: name,
            email:email,
            phone_number:0,
            pets_name:''
        });
    }
    res.status(200).json({message: 'Login successful',name,email});
    } 

catch(err){
    res.status(401).json({message:"Invalid google token"});
}

});
module.exports = router;