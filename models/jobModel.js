import mongoose from 'mongoose'

const jobSchema=new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Company name is required'],
    },
    position:{
        type:String,
        required:[true,'Job position is required'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['pending','reject','interview'],
        default:'pending'
    },
    type:{
        type:String,
        enum:['fulltime','parttime','intership','contractbase'],
        default:'fulltime'
    },
    location:{
        type:String,
        default:'India',
        required:[true,'location is required'],
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
       
    },

},{timestamps:true})

export default mongoose.model('Job',jobSchema)