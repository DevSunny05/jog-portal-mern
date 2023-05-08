import userModel from "../models/userModel.js"

export const registerController=async(req,res,next)=>{

    const {name,email,password}=req.body
    if(!name){
        next('Please provide name')
    }

    if(!email){
        next('Please provide email')
    }
    if(!password){
        next('Please provide password')
    }

    const existingUser=await userModel.findOne({email})

    if(existingUser){
       next('Email already registerd')
    }

    const user=await userModel.create({name,email,password})

    // token
    const token=user.createJWT()
    return res.status(201).json({
        success:true,
        message:'Userr created successfully',
        user,
        token
    })
    
}