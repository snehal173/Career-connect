const UserModel=require("../models/user.model");
const ConnectionModel=require("../models/connections.model");
const NotificationModel = require("../models/notifications.model");
const { getSocketInstance,userSocketMap } = require("../socket");




const sendConnection=async(req,res)=>{
    try{

        const receiverId=req.params.id;
        const senderId=req.user._id;

        const sender=await UserModel.findById(senderId);
        if(senderId==receiverId){
            return res.status(400).json({
                message:"You cannot connect with yourself"
            })
        }

        if(sender.connection.includes(receiverId)){
            return res.status(400).json({
                message:"You are already connected with the user"
            })
        }

        let existingConnection=await ConnectionModel.findOne({
            sender:senderId,
            receiver:receiverId,
            status:"pending"
        })
        if(existingConnection){
            return res.status(400).json({
                message:"request already exists"
            })
        }


        let newconnection=await ConnectionModel.create({
            sender:senderId,
            receiver:receiverId,
           

        })
        console.log(userSocketMap);
        let receiverSocketId=userSocketMap.get(receiverId);
        let senderSocketId=userSocketMap.get(senderId); 
        const io = getSocketInstance();
        console.log("the io is",io); 

        if(receiverSocketId){
            io.to(receiverSocketId).emit("statusUpdate",{updatedUserId:senderId,newStatus:"received"})
        }
        if(senderSocketId){
            io.to(senderSocketId).emit("statusUpdate",{updatedUserId:receiverId,newStatus:"pending"})
        }

        return res.status(200).json({
            message:"Connection request sent successfully",
            newconnection
        })
     }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"error occured while sending connection request"
        })
    }
}

const acceptConnection=async(req,res)=>{
    try{
        const connectionId=req.params.id;

        const connection=await ConnectionModel.findById(connectionId);

        if(!connection){
            return res.status(404).json(
                {
                    message:"Connection not found"
                }
            )
        }

       if(connection.status !="pending"){
          return res.status(404).json({
            message:"Connection request already accepted or rejected"
          })
       }

       connection.status="accepted";
       let notification=await NotificationModel.create({
                   receiver:connection.sender,
                   type:"connectionAccepted",
                   relatedUser:req.user._id,
                  
               })
       await connection.save();

       const senderId=connection.sender._id;
       const receiverId=connection.receiver._id;
       const sender=await UserModel.findById(senderId);

       if(!sender.connection.includes(receiverId.toString())){
        sender.connection.push(receiverId);
        await sender.save();
       }
      

       const receiver=await UserModel.findById(receiverId);

       if(!receiver.connection.includes(senderId.toString())){
        receiver.connection.push(senderId);
        await receiver.save();    
       }

       let receiverSocketId=userSocketMap.get(connection.receiver._id.toString());
       let senderSocketId=userSocketMap.get(connection.sender._id.toString());

       const io = getSocketInstance();
       console.log("the io is",io); 
       if(receiverSocketId){
           io.to(receiverSocketId).emit("statusUpdate",{
            updatedUserId:connection.sender._id,
            newStatus:"disconnect"
        })
       }
       if(senderSocketId){
           io.to(senderSocketId).emit("statusUpdate",{
            updatedUserId:connection.receiver._id,
            newStatus:"disconnect"
        })
       }
       
       
       return res.status(200).json({
        message:"Connection request accepted successfully",
       })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"error occured while accecpting connection request"
        })
    }
}

const rejectConnection=async(req,res)=>{
    try{
        const connectionId=req.params.id;
        const connection=await ConnectionModel.findById(connectionId);
        if(!connection){
            return res.status(404).json(
                {
                    message:"Connection not found"
                }
            )
        }
        if(connection.status !="pending"){
            return res.status(404).json({
                message:"Connection request already accepted or rejected"
            })
        }
        connection.status="rejected";
        await connection.save();
        return res.status(200).json({
            message:"Connection request rejected successfully",
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"error occured while rejecting connection request"
        })
    }
}

const getConnectionStatus=async(req,res)=>{
   try{
    const targetUserId=req.params.userId;
    const currentUserId=req.user._id;

    const currentUser=await UserModel.findById(currentUserId);
    if(currentUser.connection.includes(targetUserId)){
        return res.json({status:"disconnect"});
    }
    
    const connection=await ConnectionModel.findOne({
        $or:[
            {sender:currentUserId,receiver:targetUserId},
            {sender:targetUserId,receiver:currentUserId},
        ],
        status:"pending"
    });
    if(connection){
        if(connection.sender.toString()===currentUserId.toString()){
            return res.json({status:"pending"});
        }
        else{
            return res.json({status:"received",requestId:connection._id});
        }
    }

    return res.json({status:"Connect"});


   }catch(error){
    console.error(error);
    return res.status(500).json({
        message:"Error occured while getting connection status"
    })
   }

}

// const removeConnection=async(req,res)=>{
//     try{
//         const targetUserId=req.params.userId;
//         const currentUserId=req.user._id;

//         const currentUser=await UserModel.findByIdAndUpdate(currentUserId,{
//             $pull:{
//                 connection:targetUserId
//             }
//         },{new:true})

//         const targetUser=await UserModel.findByIdAndUpdate(targetUserId,{
//             $pull:{
//                 connection:currentUserId
//             }
//         },{new:true})

//         if(!currentUser || !targetUser){
//             return res.status(404).json({
//                 message:"user not found"
//             })
//         }
//         const connection=await ConnectionModel.findOneAndDelete({
//             $or:[
//                 {sender:currentUserId,receiver:targetUserId},{sender:targetUserId,receiver:currentUserId}
//             ]
//         })
//         if(!connection){
//             return res.status(404).json({
//                 message:"Connection not found"
//             })
//         }

//         let receiverSocketId=userSocketMap.get(targetUserId);
//         let senderSocketId=userSocketMap.get(currentUserId);
 
//         const io = getSocketInstance();
//         console.log("the io is",io); 
//         if(receiverSocketId){
//             io.to(receiverSocketId).emit("statusUpdate",{
//              updatedUserId:currentUserId,
//              newStatus:"connect"
//          })
//         }
//         if(senderSocketId){
//             io.to(senderSocketId).emit("statusUpdate",{
//              updatedUserId:targetUserId,
//              newStatus:"connect"
//          })
//         }



//         return res.status(200).json({
//             message:"Connection removed successfully",
//             connection,targetUser,currentUser
//         })

//     }catch(error){
//         console.log(error);
//         return res.status(500).json({
//             message:"error occured while removing the connection"
//         })
//     }
// }
const removeConnection=async(req,res)=>{
    try{
        const myId=req.user._id;
        const otherUserId=req.params.userId;
        await UserModel.findByIdAndUpdate(myId,{$pull:{connection:otherUserId}});
        await UserModel.findByIdAndUpdate(otherUserId,{$pull:{connection:myId}});
        
        let receiverSocketId=userSocketMap.get(otherUserId)
        let senderSocketId=userSocketMap.get(myId);
        const io = getSocketInstance();

        if(receiverSocketId){
            io.to(receiverSocketId).emit("statusUpdate",{updatedUserId:myId,newStatus:"connect"})
        }

        if(senderSocketId){
            io.to(senderSocketId).emit("statusUpdate",{updatedUserId:otherUserId,newStatus:"connect"}) 
        }

        return res.json({message:"connection removed successfully"})

    }catch(error){
      console.log(error);
      return res.status(500).json({
        message:"removeConnection Error"
      })
    }
}
const getUserConnections=async(req,res)=>{
    try{

       const userId=req.user._id;
       const user=await UserModel.findById(userId).populate("connection","firstname lastname profileImage headline connection")
       
       return res.status(200).json(
      
        user.connection ,
       )
    }catch(error){
      console.error(error);
      return res.status(500).json({
        message:"Error occured while getting all user connections"
      })
    }
}

const getConnectRequests=async(req,res)=>{
    try{
        const userId=req.user._id;
        const requests=await ConnectionModel.find({
            receiver:userId,
            status:"pending"
        }).populate("sender","firstname lastname profileImage headline");

        return res.status(200).json({
            message:"All connection requests fetched successfully",
            requests
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Error occured while getting all the requests send to the user"
        })
    }
}







module.exports={sendConnection,acceptConnection,rejectConnection,getConnectionStatus,removeConnection,getUserConnections,getConnectRequests};