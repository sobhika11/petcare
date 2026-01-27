const express=require('express');
const router=express.Router();
const user=require('User')

router.post('/profile',async (req,res)=>{
    try{
        const id=req.user.id;
    const profile= await user.findById(id);
    if(!user)
        return res.status(404).json({message:"user not found"})
    return profile
    }
    catch(err){
        return res.send(500).json({message:"server error"})
    }

});