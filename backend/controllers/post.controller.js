
const { uploadOnCloudinary } = require("../config/cloudinary");
const NotificationModel = require("../models/notifications.model");
const PostModel = require("../models/post.model");
const { getSocketInstance } = require("../socket");

const createPost=async(req,res)=>{
    try{
        const {description}=req.body;
        if (!description) {
            return res.status(400).json({ message: "Description is required." });
        }
         let post;
         if(req.file){
            let image=await uploadOnCloudinary(req.file.path);
            post=await PostModel.create({
                author:req.user._id,
                image:image,
                description:description
            })
         }
         else{
            post=await PostModel.create({
            author:req.user._id,
            description:description
            })
         }
       

        return res.status(200).json({
            message:"Post created successfully",
            post
        })
        
        
        
    }catch(error){
        return res.status(500).json({
            message:"Error occured while creating a post "
        })
        
    }
}

const getAllPosts=async(req,res)=>{
    try{
        const posts=await PostModel.find().sort({createdAt:-1})
        .populate("author","firstname lastname username headline profileImage")
        .populate("comment.user","firstname lastname username headline profileImage");

        return res.status(200).json({
            message:"Posts fetched successfully",
            posts
        })
    }catch(error){
       console.log(error);
       return res.status(500).json({
        message:"Error occured while fetching all the posts"
       })
    }
}

const likePost=async(req,res)=>{
   try{
    const postId=req.params.id;
    const userId=req.user._id;
    const post=await PostModel.findById(postId);
    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }
    if(post.like.includes(userId)){
        post.like=post.like.filter((id)=>id.toString() != userId.toString());
    }else{
        post.like.push(userId);
        if(post.author !=userId){
          let notification=await NotificationModel.create({
            receiver:post.author,
            type:"like",
            relatedUser:userId,
            relatedPost:postId
        })
        }
        
    }
    await post.save();
    const io = getSocketInstance();
   
    io.emit("likeUpdated",{
        postId,likes:post.like
    })
   
    return res.status(200).json({
        message:"Post liked successfully",
        post
    })

   }catch(error){
     console.log(error);
     return res.status(500).json({
        message:"error occured while liking the posts"
     })
   }
}

const commentPost=async(req,res)=>{
    try{
        const postId=req.params.id;
        const userId=req.user._id;
        const content=req.body.content;
        if(!content){
            return res.status(400).json({
                message:"Comment content is required"
            })
        }
        const post= await PostModel.findById(postId);
        if(!post){
            return res.status(404).json({
                message:"Post not found"
            })
        }
        post.comment.push({
            content:content,
            user:userId
        })
         await post.save();
         if(post.author !=userId){
            let notification=await NotificationModel.create({
            receiver:post.author,
            type:"comment",
            relatedUser:userId,
            relatedPost:postId
        })
     
        }

        const populatedPost=await PostModel.findById(postId).populate("comment.user","firstname lastname username headline profileImage")
        const io = getSocketInstance();
        
        io.emit("commentAdded",{postId,comm:populatedPost.comment})
        return res.status(200).json({
            message:"Comment added successfully",
            populatedPost
        })

    }catch(error){
         console.log(error);
         return res.status(500).json({
            message:"error while commenting on the post",
            
         })
    }
}



module.exports={createPost,getAllPosts,likePost,commentPost};