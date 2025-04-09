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
connectDB()


























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