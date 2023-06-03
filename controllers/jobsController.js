import jobModel from "../models/jobModel.js"
import mongoose from "mongoose"
import moment from 'moment'

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
    const {status,workType,search,sort}=req.query

        const queryObject={
            createdBy:req.user.userId
        }

        if(workType && workType !== 'all'){
            queryObject.workType=workType
        }

        if(status && status !== 'all'){
            queryObject.status=status
        }

        if(search){
            queryObject.position={$regex:search,$options:'i'}
        }

        let queryResult=jobModel.find(queryObject)

        // sorting
        if(sort === 'latest'){
            queryResult=queryResult.sort('createdAt')
        }

        if(sort === 'oldest'){
            queryResult=queryResult.sort('-createdAt')
        }


        if(sort === 'a-z'){
            queryResult=queryResult.sort('position')
        }
        if(sort === 'z-a'){
            queryResult=queryResult.sort('-position')
        }

        const jobs=await queryResult
    
    // const jobs=await jobModel.find({createdBy:req.user.userId})
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

// delete job || delete
export const deleteJobController=async(req,res,next)=>{
    const {id}=req.params
    const job=await jobModel.findOne({_id:id})

    if(!job){
        next(`No jobs found with this id ${id}`)
    }

    if(! req.user.userId === job.createdBy.toString() ){
        next("You are not authorize to delete this job")
        return
    }

    await job.deleteOne()

    res.status(200).json({
        success:'true',
        message:'Success ,Job deleted'
    })
}

// jobs stats and filter

export const jobsStatsController=async(req,res)=>{
    const stats=await jobModel.aggregate([
        // search by user jobs
        {
            $match:{
                createdBy:new mongoose.Types.ObjectId(req.user.userId)
            },
           
        },{
            $group:{
                _id:'$status',
                count:{$sum:1}
            }
        }
    ])

    const defaultStats={
        pending:stats.pending || 0,
        reject:stats.reject || 0,
        interview:stats.interview || 0
    }

    // yerlt or monthly stats
    let monthlyApplications=await jobModel.aggregate([
        {
            $match:{
                createdBy:new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group:{
                _id:{
                    year:{$year:'$createdAt'},
                    month:{$month:'$createdAt'}
                },
                count:{
                    $sum:1
                }
            }
        }
    ])

    monthlyApplications=monthlyApplications.map(item=>{
        const {_id:{year,month},count}=item
        const date=moment().month(month-1).year(year).format('MMM Y')
        return {date,count}
    }).reverse()


    
        res.status(200).json({totalJobs:stats.length,stats,defaultStats,monthlyApplications})
}
