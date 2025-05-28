const mongoose=require("mongoose");
const schema=mongoose.Schema;

const userSchema=new schema({
   firstname:{
     type:String,
     required:true
   },
   lastname:{
    type:String,
    required:true
   },
   username:{
    type:String,
    unique:true,
    required:true
   },
   email:{
    type:String,
    required:true,
    unique:true,
   },
   password:{
    type:String,
    minLength:4,
    required:true
   },
   profileImage:{
    type:String,
    default:"",
   },
   coverImage:{
    type:String,
    default:"",
   },
   headline:{
    type:String,
    default:"",
    },
    skills:[{type:String}],
    
    education:[
        {
            college:{type:String},
            degree:{type:String},
            fieldOfStudy:{type:String}
        }
    ],
    gender:{
        type:String,
        enum:["male","female","other"]
    },
    location:{
        type:String,
        default:"India"
    },
    experience:[
        {
            title:{type:String},
            company:{type:String},
            description:{type:String},
        }
    ],
    connection:[
        {
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
        },


    ]

    
        

},{timestamps:true})

const userModel=mongoose.model('User',userSchema);
module.exports=userModel;
