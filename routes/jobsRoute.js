import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { createJobController, deleteJobController, getAllJobsController, jobsStatsController, updateJobController } from '../controllers/jobsController.js'

const router=express.Router()

// create job || post 
router.post('/create-job',userAuth,createJobController)

// get all jobs || get
router.get('/get-jobs',userAuth,getAllJobsController)

// update jobs || put
router.put('/update-job/:id',userAuth,updateJobController)

// delete job || delete
router.delete('/delete-job/:id',userAuth,deleteJobController)

// jobs stats filter || get
router.get('/job-stats',userAuth,jobsStatsController)

export default router
