const express=require("express")
const router=express.Router();
const userController=require("../controllers/user.controller")
const authmiddleware =require("../middlewares/authmiddleware")
const upload=require("../middlewares/multer")
router.get('/profile',authmiddleware.authuser,userController.getProfile);
router.put('/updateProfile',authmiddleware.authuser,upload.fields([
    {name:"profileImage",maxCount:1}
    ,{name:"coverImage",maxCount:1}
]),userController.updateProfile);
router.get("/currentprofile/:username",authmiddleware.authuser,userController.getcurrentuserprofile)
router.get("/search",authmiddleware.authuser,userController.searchHandler)
router.get("/suggesteduser",authmiddleware.authuser,userController.getSuggestedUser)
module.exports=router;
