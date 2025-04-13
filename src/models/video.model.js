import mongoose,{Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
//this is used for sending querys to the database and getting paginated results
import bcrypt from 'bcryptjs'
//this is used to hash the password
import jwt from 'jsonwebtoken'
//this is used to create a token for the user
//direct encryption is not possible so we need hooks
const videoSchema=new Schema({

    videoFile:{
        type:String,//cloudinary url
        required:true
    },
    thumbnail:{
        type:String,//cloudinary url
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },duration:{
        type:Number,//cloudinary url
        required:true
    },
    views:{
        type:Number,
        default:0
    },isPublished:{
        type:Boolean,
        default:true
    },owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})// this will add createdAt and updatedAt fields to the schema
videoSchema.plugin(mongooseAggregatePaginate)//this will add the aggregatePaginate method to the schema
export const Video=mongoose.model("Video",videoSchema)
// this is used to create a model for the video schema
//bcypt hashes our password 
//jwt jsonwebtoken is used to create a token for the user