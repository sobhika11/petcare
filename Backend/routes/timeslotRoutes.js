const express=require('express')
const router=express.Router()
const Appointment=require("../models/Appointment")
router.get("/timeslot",async(req,res)=>{
    try{
        const {date}=req.query;
        const booked= await Appointment.find({preferredDate: date});
        const available=booked.map(a=>a.preferredTime);
        const allSlots = ["10:00","11:00","12:00","1:00","2:00","3:00","4.00"];
        const freeslot=allSlots.filter(t=>!available.includes(t));
        if(freeslot.length===0)
            return res.json(allSlots);
        res.json(freeslot);

    }
    catch(err){
        return res.json({message:"couldnt find,error in server"})
    }
    
});
module.exports = router;