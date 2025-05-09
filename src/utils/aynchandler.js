const asyncHandler=(requestHandler)=>{
return (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
}
}


export default asyncHandler
// this is used to handle the async errors in the express routes
//for try catch block in the routes
// const asyncHandler= (fn)=>async(req,res,next)=>{
// //passing fn in two functions
// try{
// await fn(req,res,next) //this will call the function and pass the req,res,next to it
// //and also await it
// }catch (error){
// res.status(error.code||500).json({success:false,message:error.message})
// }
// }