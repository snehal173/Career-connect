const UserModel=require("../models/user.model");

const { uploadOnCloudinary } = require("../config/cloudinary");

const getProfile=async(req,res)=>{
 try{
    const user=req.user;
    if(!user){
      return res.status(400).json({message:"user does not exist"});
    }
    return res.status(200).json({
      message:"user data fetched successfully",
      user
    })
 }catch(error){
    console.log(error);
    return res.status(400).json({
        message:"get current user error"
    })
 }
}

const updateProfile=async(req,res)=>{
  try{
    const {firstname,lastname,email,username,gender,location,headline}=req.body;
    let profileImage;
    let coverImage;
   
    let skills=req.body.skills? JSON.parse(req.body.skills):[];
    let education=req.body.education? JSON.parse(req.body.education):[];
    let experience=req.body.experience? JSON.parse(req.body.experience):[];
    console.log(req.files);
    if(req.files?.profileImage){
      profileImage=await uploadOnCloudinary(req.files.profileImage[0].path);
      console.log("Profile Image URL:", profileImage); 
    }
    if(req.files?.coverImage){
      coverImage=await uploadOnCloudinary(req.files.coverImage[0].path);
      console.log("Cover Image URL:", coverImage); 
    }

    const user=await UserModel.findByIdAndUpdate(req.user._id,{
      firstname,lastname,email,username,gender,location,headline,skills,education,experience,
      profileImage
      ,coverImage
    },{new:true}).select("-password")
     console.log(user);
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });

  }catch(error){
    console.log(error);
    return res.status(500).json({
      message:"some error occured while updating profile in the backend"
    })
  }
}

const getcurrentuserprofile=async(req,res)=>{
  try{
    const username=req.params.username;
  const user=await UserModel.findOne({username}).select("-password");
  if(!user){
    return res.status(401).json({
      message:"user with this username does not exist"
    })
  }
  return res.status(200).json({
    success: true,
    message:"success,userprofile fetched successfully",
    user
  })

  }catch(error){
    console.log(error);
    return res.status(500).json({
      message:"error occured"
    })
  }


}


const searchHandler=async(req,res)=>{
 try{
   let {query}=req.query

  if(!query){
     return res.status(400).json({
      message:"query is required"
     })
  }
  let users=await UserModel.find({
     $or:[
      {firstname:{$regex:query,$options:"i"}},
      {lastname:{$regex:query,$options:"i"}},
      {username:{$regex:query,$options:"i"}},
      {skills:{$in:[query]}}
     ]
  })
  return res.status(200).json(users)

 }catch(error){
    console.log(error)
    return res.status(500).json(
      {message:`error in search:${error}`}
    )
      
 }


}

const getSuggestedUser=async(req,res)=>{
  try{
    let currentUser=await UserModel.findById(req.user._id).select("connection")

    let suggestedUsers=await UserModel.find({
      _id:{
          $ne:currentUser, $nin:currentUser.connection
      }
     
    }).select("-password")

    return res.status(200).json({
      message:"suggested users fetched successfully",
      suggestedUsers
    })



  }catch(error){
    console.log(error)
    return res.status(500).json(
      {message:`error in suggested users:${error}`}
    )
  }
}






module.exports={getProfile,updateProfile,getcurrentuserprofile,searchHandler,getSuggestedUser};