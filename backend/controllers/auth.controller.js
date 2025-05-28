const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")

const signup=async(req,res)=>{
    try{
    const {firstname,lastname,username,email,password}=req.body;
    
    if(!firstname || !lastname || !username ||!email || !password){
        return res.status(400).json({ message: "All fields are required" });
    }
    let userexists=await userModel.findOne({email});
    if(userexists){
        return res.status(401).json({
            message:"user already exists!",

        })
    }
    let existsUsername=await userModel.findOne({username});
    if(existsUsername){
        return res.status(401).json({
            message:"username already exists, try with another one!",

        })
    }

    const hashPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        firstname:firstname,
        lastname:lastname,
        username:username,
        email:email,
        password:hashPassword
    })
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"strict",
        secure:process.env.NODE_ENV==="production"
    })
    return res.status(201).json({
        message:"User has signed in successfully",
        user,token
    })

    }catch(error){
      console.log(error);
      return res.status(500).json({
        message:"error while signing up"
      })
    }
}

const login=async(req,res)=>{
   try{
    const {email,password}=req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

    
    const user=await userModel.findOne({email:email});
    if(!user){
        return res.status(401).json({
            message:"user does not exist"
        })
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
       return res.status(400).json({message:"incorrect password"})
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"strict",
        secure:process.env.NODE_ENV==="production"
    })
    console.log(user,token);
    return res.status(200).json({
        message:"user login successfully",
        token,user
    })
    
   }catch(error){
      console.log(error);
     return res.status(500).json({
        message:"error while login in"
     })
   }

}

const logout=async(req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({
            message:"logout successfully!"
        })

    }catch(error){
       console.log(error);
       return res.status(500).json({message:"logout error"})
    }
}

module.exports={signup,login,logout};