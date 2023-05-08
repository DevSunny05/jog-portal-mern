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
        user:{
            name:user.name,
            lastName:user.lastName,
            email:user.email,
            location:user.location
        },
        token
    })
    
}

export const loginController=async(req,res,next)=>{
    const {email,password}=req.body

    if(!email || !password){
        next('Please provide all the fields')
    }

    const user=await userModel.findOne({email}).select("+password")
    if(!user){
        next("Invalid Username and Password")
    }

    const isMatch=await user.comparePassword(password)
    if(!isMatch){
        next("Invalid  Username and Password")
    }

    user.password = undefined;

    const token=await user.createJWT()

    res.status(200).json({
        success:true,
        message:'Login successfully',
        user,
        token
    })
}