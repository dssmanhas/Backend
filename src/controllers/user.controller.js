import asyncHandler from "../utils/aynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        console.log("Fetching user by ID:", userId);
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        console.log("Generating access token...");
        const accessToken = user.generateAccessToken();

        console.log("Generating refresh token...");
        const refreshToken = user.generateRefreshToken();

        console.log("Saving refresh token to user...");
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        console.log("Tokens generated successfully");
        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error in generateAccessAndRefreshTokens:", error);
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};
const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;
    console.log("email :", email);

    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }
    console.log(req.files)
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath
        ? await uploadOnCloudinary(coverImageLocalPath)
        : null;

    if (!avatar) {
        throw new ApiError(400, "Avatar is required");
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    const checkUser = await User.findById(user._id).select("-password -refreshToken");
    if (!checkUser) {
        throw new ApiError(500, "User not created");
    }

    return res.status(201).json(
        new ApiResponse(200, checkUser, "User created successfully")
    );
});
const loginUser=asyncHandler(async(req,res)=>{
    //req body -> data
    //username or email
    //find the user 
    //password check
    //access and refresh token generated and sent to user
    //send them through cookies
   const {email,username,password}=req.body
   if(!email && !username){
    throw new ApiError(400,"Email or username is required")
   }
   //User is used because findOne is mongo method
   const user=await User.findOne({$or:[{email},{username}]})
   if(!user){
    throw new ApiError(404,"User not found")    
   }
  const isPasswordValid=await user.isPasswordCorrect(password)
   //user is used because isPasswordCorrect is taken from req.body
   if(!isPasswordValid){
    throw new ApiError(401,"Invalid Password")
   }
   const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)

   const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

   const options={
    httpOnly:true,
    secure: true
   }
   //key:accessToken value:accessToken  
   return res.status(200).cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken,options)
   .json(new ApiResponse(200,
    {
        user:loggedInUser, accessToken,refreshToken
    },
    "User logged in successfully"
   ))
})
const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true
    }
    return res.status(200).clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out successfully")) 
})
const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401,"Refresh token is required")
    }
   try {
     const decodedToken=jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
     const user=await User.findById(decodedToken?._id)
     if(!user){
         throw new ApiError(401,"Invalid refresh token")
     }
     if(user?.refreshToken!==incomingRefreshToken){
         throw new ApiError(401,"Invalid refresh token exp or used")
     }
     const options={
         httpOnly:true,
         secure:true
     }
     const {accessToken,newrefreshToken}=await generateAccessAndRefreshTokens(user._id)
     return res
     .status(200)
     .cookie("accessToken",accessToken,options)
     .cookie("refreshToken",newrefreshToken,options)
     .json(
         new ApiResponse(200,{
             accessToken,
             refreshToken:newrefreshToken
         },"Access token refreshed successfully")
     )
   } catch (error) {
    throw new ApiError(401,error?.message || "Invalid refresh token")
   }
})
export { registerUser ,loginUser, logoutUser, refreshAccessToken};
