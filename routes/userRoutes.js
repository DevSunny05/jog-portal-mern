import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { updateUserController } from '../controllers/userController.js'

const router=express.Router()

// get users || get

// update user || put
router.put('/update-user',userAuth,updateUserController)

export default router