const mongoose=require("mongoose")
const Schema=mongoose.Schema

const notificationSchema=new Schema({

    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    type:{
        type:String,
        enum:["like","comment","connectionAccepted"]
    },
    relatedUser:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    relatedPost:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
   
},{timestamps:true})


const NotificationModel=mongoose.model('Notification',notificationSchema);
module.exports=NotificationModel