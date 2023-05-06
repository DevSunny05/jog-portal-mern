// imports
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import cors from 'cors'
import morgan from 'morgan'

// config
dotenv.config()

// mongodb connections
connectDB()

// rest object
const app=express()

// middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


// routes
app.get('/',(req,res)=>{
    res.send('Welcome')
})

// port 
const PORT=process.env.PORT || 8080

app.listen(8080,()=>{
    console.log(`server running on port ${PORT} `.bgCyan.white)
})