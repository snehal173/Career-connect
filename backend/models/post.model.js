const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const PostSchema=new Schema({
    image:{
        type:String,
        
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    description:{
         type:String,
         required:true,
         default:""
        },
    like:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    ],
    comment:[
        {
           content:{type:String,required:true},
           user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
           }
        },
    ]
    
},{timestamps:true})

const PostModel=mongoose.model("Post",PostSchema);
module.exports=PostModel;