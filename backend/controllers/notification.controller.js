const NotificationModel=require("../models/notifications.model")


const getNotifications=async(req,res)=>{
    try{
       const notifications=await NotificationModel.find({
        receiver:req.user._id
       })
       .populate("relatedUser","firstname lastname profileImage")
       .populate("relatedPost","image description")

       return res.status(200).json(notifications)
    }catch(error){
        return res.find(500).json({
            message:`get notification error ${error}`
        })
    }
}


const deleteNotifications=async(req,res)=>{
    try{
       let id=req.params.id;
       await NotificationModel.findByIdAndDelete({
        _id:id,
        receiver:req.user._id
       })
       return res.status(200).json({
        message:"notification deleted successfully"
       })
    }catch(error){
        return res.status(500).json({message:`delete notification ${error}`})
    }
}

const clearAllNotifications=async(req,res)=>{
    try{
        await NotificationModel.deleteMany({
            receiver:req.user._id
        })
        return res.status(200).json({
            message:"all notifications deleted successfully"
        })

    }catch(error){
        return res.status(500).json({
            message:`delete all notification error ${error} `
        })
    }
}

module.exports={getNotifications,deleteNotifications,clearAllNotifications}