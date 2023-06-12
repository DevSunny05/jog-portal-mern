import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { getUserController, updateUserController } from '../controllers/userController.js'

const router=express.Router()

// get users data || get
router.post('/getUser',userAuth,getUserController)

// update user || put
router.put('/update-user',userAuth,updateUserController)

export default router