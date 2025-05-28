const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const ConnectionSchema=new Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
       
        ref:"User"
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        
        ref:"User"
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    }

},{
    timestamps:true
})

const ConnectionModel=mongoose.model("Connection",ConnectionSchema);
module.exports=ConnectionModel;