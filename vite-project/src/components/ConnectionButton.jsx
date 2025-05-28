import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';

import { userDataContext } from '../context/UserContext';
import { SocketDataContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';


const ConnectionButton = ({userId}) => {
    const {serverUrl}=useContext(authDataContext)
    const {userData}=useContext(userDataContext)
    const {socket}=useContext(SocketDataContext)
    const [status,setStatus]=useState('')
    const navigate=useNavigate();
    const handleSendConnection=async()=>{
        try{
            let result=await axios.post(`${serverUrl}/api/connection/send/${userId}`,
                {},{withCredentials:true})
                console.log(result);
                setStatus(result.data.newconnection.status)
        }catch(error){
            console.log(error);
        }
    }

    const handleRemoveConnection=async()=>{
        try{
            let result=await axios.delete(`${serverUrl}/api/connection/remove/${userId}`,
                {withCredentials:true})
                console.log(result);
               setStatus("connect");

        }catch(error){
            console.log(error);
        }
    }


    const handleGetStatus=async()=>{
        try{
            let result=await axios.get(`${serverUrl}/api/connection/status/${userId}`,
                {withCredentials:true})
                console.log(result);
                setStatus(result.data.status)
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
      socket.emit("register",userData._id)
      handleGetStatus()

      socket.on("statusUpdate",({updatedUserId,newStatus})=>{
       
            if(updatedUserId==userId){
              setStatus(newStatus)
            }
        
       
      })

      return ()=>{
        socket.off("statusUpdate")
      }
    },[userId])


    const handleClick=async()=>{
        if(status=="disconnect"){
            await handleRemoveConnection();
        }else if(status=="received"){
            navigate("/mynetwork")
            
        }
        else{
            await handleSendConnection();
        }
    }






  return (
   <button 
   className='min-w-[100px] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] cursor-pointer '
   onClick={handleClick} disabled={status=="pending"}>{status}

   
   </button>
  )
}

export default ConnectionButton