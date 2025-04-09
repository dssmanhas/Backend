import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';
console.log("MONGODB_URI in indexdb.js:", process.env.MONGODB_URI);
const connectDB=async ()=>{
    try{

        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }catch(error){
        console.log(error)
        //throw error and can also use
        process.exit(1)
    }
}
export default connectDB
//here the uri is undefined because it is not picking he uri from .env file even when we config it before we import it in index.js but when we add experimental feature in json package scripts:{ "dev":etc.}