const mongoose=require('mongoose');
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        phone_number:{
            type:String,
            required:true
        },
        pets_name:{
            type:String,
            required:false
        }
    });
module.exports=mongoose.model('User',userSchema);