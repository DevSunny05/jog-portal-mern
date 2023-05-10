import jobModel from "../models/jobModel.js"

export const createJobController=async(req,res,next)=>{
    const {company,position}=req.body

    if(!company || ! position){
        next('Please provide all fields ')
    }
    req.body.createdBy =req.user.userId

    const job=await jobModel.create(req.body)
    res.status(201).json({job})
}
// get jobs controller
export const getAllJobsController=async(req,res,next)=>{
    const jobs=await jobModel.find({createdBy:req.user.userId})
    res.status(200).json({
        totlaJobs:jobs.length,
        jobs

    })
}

// update jobs || put/patch
export const updateJobController=async(req,res,next)=>{
    const {id}=req.params
    const {company,position,}=req.body

    if(!company || !position){
        next("Please provide credientials")
    }

    const job=await jobModel.findOne({_id:id})

    if(!job){
        next(`no job found with this ${id}`)
    }

    if(!req.user.userId === job.createdBy.toString()){
        next('You are not authorize to update')
        return  
    }

    const updatedJob=await jobModel.findOneAndUpdate({_id:id},req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        updatedJob
    })
}
