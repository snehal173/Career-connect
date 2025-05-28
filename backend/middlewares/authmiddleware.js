const jwt=require("jsonwebtoken");
const UserModel=require("../models/user.model")
const authuser=async(req,res,next)=>{
    try{
        const token=req.cookies?.token || req.headers.authorization?.split(' ')[1];
        console.log("token",token);
        if(!token){
            return res.status(400).json({
                message:"token is missing"
            })
        }
        const decode= jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        const userid=decode.id;
        const user=await UserModel.findById(userid);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user=user;
        //req.userid=userid
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"error occured in middleware "
        })
    }

}

module.exports={authuser};