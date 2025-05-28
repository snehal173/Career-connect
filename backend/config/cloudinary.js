const cloudinary = require("cloudinary").v2; //! Cloudinary is being required
const fs=require("fs");
exports.uploadOnCloudinary =async (filePath) => {
	cloudinary.config({
			//!    ########   Configuring the Cloudinary to Upload MEDIA ########
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.API_KEY,
		api_secret: process.env.API_SECRET,
	});
    try{
        if(!filePath){
            console.log("file path is not provided");
            return null;
        }
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto", // handles images, videos, etc.
        });
        console.log("Cloudinary upload result:", uploadResult);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return uploadResult.secure_url

	} catch (error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        console.error("Cloudinary upload error:", error);
		console.log(error);
        return null;
	}
};