const mongoose=require("mongoose");

const connectDb=async()=>{
   try{
    mongoose.connect(process.env.MONGODB_URL)
     console.log("db connect");
   }catch(error){
     console.log(error);
     console.log("error while connecting to the database");
   }

}

module.exports=connectDb;
