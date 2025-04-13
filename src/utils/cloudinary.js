//user upload -> multer -> local space ->cloudinary
//this is used for re upload option
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
//this is file system for read write remove etc. of files
(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Click 'View API Keys' above to copy your cloud name
        api_key: process.env.CLOUDINARY_API_KEY, // Click 'View API Keys' above to copy your API key
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
    const uploadOnCloudinary=async(filepath)=>{
        try{
            if(!filepath) return null;
            const response= await cloudinary.uploader.upload(filepath,{
                resource_type: 'auto'

            })
            //file has been uplaoded successfully
            console.log("file is uploaded",response.url)
            return response
        } catch(error){
            fs.unlinkSync(filepath)//this will remove the file from the local storage
            return null;
        }
    }
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();
export default uploadOnCloudinary;