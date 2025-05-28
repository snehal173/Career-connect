import React, { useContext, useEffect,useState } from 'react'
import Navbar from '../components/Navbar'
import { authDataContext } from '../context/AuthContext'
import dp from "../assets/profile_img.png"
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import axios from 'axios'

const Network = () => {
  const {serverUrl}=useContext(authDataContext)
  const [connections,setConnections]=useState([])

  const handlerRequests=async()=>{
     try{
      const response=await axios.get(`${serverUrl}/api/connection/getrequests`,{withCredentials:true});
      console.log(response);
      setConnections(response.data.requests);

     }catch(error){
      console.log(error);
     
     }
  }
  const handleAcceptConnection=async(requestId)=>{
    try{
      let response=await axios.put(`${serverUrl}/api/connection/accept/${requestId}`,{},{withCredentials:true});
      console.log(response);
      setConnections(connections.filter((con)=>con._id==requestId))

    }catch(error){
      console.log(error);
    }
  }
  const handleRejectConnection=async(requestId)=>{
    try{
      let response=await axios.put(`${serverUrl}/api/connection/reject/${requestId}`,{},{withCredentials:true});
      console.log(response);
      setConnections(connections.filter((con)=>con._id==requestId))
    }catch(error){
      console.log(error);
    }

  }
  useEffect(()=>{
    handlerRequests();
  },[])
  return (
    <div className='w-screen h-[100vh] bg-[white] pt-[100px] px-[20px] flex flex-col items-center gap-[40px]'>
        <Navbar/>
        <div className='w-full h-[100px] bg-white shadow-lg 
        rounded-lg flex items-center p-[10px] text-[22px] text-gray-600'>
          Invitations {connections.length}

        </div>
        {connections.length>0 &&
        <div className='w-[100%] max-w-[900px] shadow-lg rounded-lg flex flex-col  gap-[20px] min-h-[100px]'>
          {
            connections.map((connection,index)=>{
              return(
                <div key={index} className='w-full  bg-white shadow-lg rounded-lg flex justify-between items-center gap-[20px] min-h-[100px]'>
                  <div className='w-full min-h-[100px] p-[20px] flex justify-start items-center gap-[20px]'> 
                      <div className='w-[60px] h-[60px] rounded-full overflow-hidden cursor-pointer'>
                        <img src={connection.sender.profileImage||dp} alt="profileimg"/>
                      </div>

                      <div className='text-[19px] font-semibold text-gray-700'>
                      {`${connection.sender.firstname} ${connection.sender.lastname}`}
                        
                      </div>

                  </div>
                  
                  
                  <div className='flex justify-center items-center gap-[10px]' > 
                    <button className='text-[#18c5ff] font-semibold cursor-pointer' onClick={()=>handleAcceptConnection(connection._id)}>
                    <FaCheckCircle className='w-[36px] h-[36px]' />
                    </button>
                    <button className='text-red-600 font-semibold cursor-pointer' onClick={()=>handleRejectConnection(connection._id)}>
                    <MdOutlineCancel className='w-[40px] h-[40px]' />  
                    </button>

                  </div>
                </div>

                
              )
            })
          }
        </div>
      }
    </div>
    
  )
}

export default Network
