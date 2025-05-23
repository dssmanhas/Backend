//cannot import .dotenv using import keyword have to use require keyword
//there is another way
//middlewares for checking something before passing
//db for database connection
//routes for routing like app.get
//utils for storing utilities like tokens give and take
import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./db/indexdb.js";
console.log("MONGODB_URI from .env:", process.env.MONGODB_URI);
//import mongoose from 'mongoose'
//wrap the database connect in try catch block and use async await
//import {DB_NAME} from "./constants"
//{DB_NAME} is used because multiple values are present in ./constants file
//require('dotenv').config()
connectDB()// as  async is used a promise will be returned so then and catch should be used
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
        //this will run when the server is running and connected to the database
    })
})
.catch((err)=>{
    console.log(err);
    process.exit(1)// this will exit the process if error occurs
    //process.exit(1) is used to exit the process with a failure code
})
import app from './app.js'
// if export default is ussed then import app simple name is sufficient but if {name} is used then import {name} is used

























/*
import express from 'express'
const app=express()
( async()=>{
    try{
         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",()=>{
            console.log(error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })// this is used to listen to errors from the app if it is connectd but still some errors are being shown while talking with the app
    } catch(error){
        console.log(error);
        throw err
    }
})*/