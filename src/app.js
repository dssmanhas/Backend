import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app=express()
app.use(cors({
    origin:process.env.cors_origin,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))// this is used to limit the size of the request body to 16kb
// this is used for json files data and also for the body parser
app.use(express.urlencoded({extended:true,limit:"16kb"}))// this is used to parse the urlencoded data and also limit the size of the request body to 16kb
//this parses the url encoded data in its form.
//extended is used for nested objects in the urlencoded data
app.use(express.static("public"))
// this is used to serve static files from the public folder
//i want to store some files like images pdf files in my server 
app.use(cookieParser())// this is used to parse the cookies in the request
//this is used to parse the cookies in the request and also to set the cookies in the response
//middleware is used to check a request before sending a response
//(err,req,res,next) next is used to call the next middleware in the stack
import userRouter from './routes/user.routes.js'




//routes declaration
//as routes and controllers are in different files
//we need to import the routes and use them in the app
app.use('/api/v1/users',userRouter)
//this is used to use the user router in the app
//this will take you to api/v1/users/register



export default app