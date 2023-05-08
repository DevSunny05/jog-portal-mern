import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    lastName:{
        type:String,
       
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'Password length greater than 6 character']
    },
    location:{
        type:String,
        default:'India'
    },
},{timestamps:true})

// middleware
userSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

// json web token
userSchema.methods.createJWT=function(){
    return jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:'1d'})
}

export default mongoose.model('User',userSchema)