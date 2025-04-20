import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"    
import asyncHandler from '../utils/aynchandler.js'
export const verifyJWT=asyncHandler(async(req,resizeBy,next)=>{
try {
    const token=req.cookies?.accessToken|| req.headers("Authorization")?.replace("Bearer","")
    if(!token){
        throw new ApiError(401,"Unauthorized request")
    }
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user=await User.findById(decodedToken?._id).select("-password -refreshToken -__v")
    if(!user){
        throw new ApiError(401,"Unauthorized request")
    }
    req.user=user
    next()
} catch (error) {
    throw new ApiError(401,error?.message || "Invalid acces token")
}
})