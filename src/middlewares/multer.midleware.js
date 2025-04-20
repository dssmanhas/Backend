import multer from 'multer'

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/temp")//this is the folder where the file will be stored
    },
    filename:function(req,file,cb){
        //this will create a unique name for the file
        cb(null,file.originalname)
    }
})
export const upload=multer({storage,})
//multer is used because in req json data can come but not files
//http data sent will be perceived as such but for https the data is encrypted first
//URL-LOCATION
//URI-iDENTIFIER
//URN-RESOURCE-NAME
//HTTP HEADERS NAME:Value in both req and res
