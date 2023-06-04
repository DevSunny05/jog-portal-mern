// imports
import express from 'express'
import  swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import 'express-async-errors'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobsRoute.js'
import helmet from 'helmet'
import xss from 'xss-clean'
import expressMongoSanitize from 'express-mongo-sanitize'


// config
dotenv.config()

// mongodb connections
connectDB()

// swagger api config
const options={
    definition:{
        openapi:'3.0.0',
    info:{
        title:'job portal application',
        description:'mern job portal app'
    },
    servers:[
        {
            url:'http://localhost:8080'
        }
    ]
    },
    apis:['./routes/*.js']
    
}

const spec=swaggerJSDoc(options)

// rest object
const app=express()

// middleware
app.use(expressMongoSanitize())
app.use(helmet())
app.use(xss())
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


// routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/job',jobRoutes)

// homeroutes
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(spec))

// validatin middleware
app.use(errorMiddleware)

// port 
const PORT=process.env.PORT || 8080

app.listen(8080,()=>{
    console.log(`server running on port ${PORT} `.bgCyan.white)
})