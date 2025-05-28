import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import dp from "../assets/profile_img.png"
import axios from 'axios'
import { RxCross1 } from "react-icons/rx"

const Notification = () => {
    const {serverUrl}=useContext(authDataContext)
    const [notificationData,setNotificationData]=useState([])
    const handleNotifications=async()=>{
        try{
          const result=await axios.get(serverUrl+"/api/notification/get",{withCredentials:true})
          console.log(result)
          setNotificationData(result.data)
        }catch(error){
          console.log(error)
        }
    }

    const handleRemove=async(id)=>{
      try{
        const response=await axios.delete(`${serverUrl}/api/notification/delete/${id}`,{withCredentials:true});
        console.log(response);
        await handleNotifications();

      }catch(error){
       console.log(error)
      }
    }

     const ClearAllHandler=async()=>{
      try{
        const response=await axios.delete(serverUrl+"/api/notification/",{withCredentials:true});
        console.log(response);
         await handleNotifications();

      }catch(error){
       console.log(error)
      }
    }
    
    const checkType=(type)=>{
       if(type=="like"){
        return "liked your post"
       }
       else if(type=="comment"){
        return "commented on your post"
       }
       else{
        return "accepted your connection"
       }
    }

    useEffect(()=>{
      handleNotifications();
    },[])
  return (
    <div className='w-screen h-[100vh] bg-[white] pt-[100px] px-[20px] flex flex-col items-center gap-[40px]'>
        <Navbar/>
        <div className='w-full h-[100px] bg-white shadow-lg 
        rounded-lg flex items-center p-[10px] text-[22px] text-gray-600'>
           <div className='w-full flex justify-between items-center'>
            <div>Notifications {notificationData.length}</div> 
           {notificationData.length>0 &&  <button className='w-[100px] px-[10px] h-[40px]  bg-blue-400 font-medium cursor-pointer text-white text-lg mr-4 rounded-lg' onClick={()=>ClearAllHandler()}>Clear All</button>}
           </div>
        </div>

       {
        notificationData.length>0 && <div className='w-[100%]  max-w-[900px] shadow-lg rounded-lg flex flex-col  gap-[10px]  h-[100vh] overflow-auto'>
            {
                notificationData.map((noti,index)=>(
                    <div className="min-h-[100px] w-full border-b-2 border-b-gray-400 "key={index}> 
                        <div className='flex justify-between items-start'>
                           <div className='w-full min-h-[100px] p-[20px] flex justify-start items-center gap-[20px]'> 
                            <div className='w-[60px] h-[60px] rounded-full overflow-hidden cursor-pointer'>
                                <img src={noti.relatedUser.profileImage||dp} alt="profileimg"/>
                            </div>
                         
                            <div className='text-[19px] font-semibold text-gray-700'>
                            {`${noti.relatedUser.firstname} ${noti.relatedUser.lastname} ${checkType(noti.type)}`}
                            </div>
                          
                          </div>

                          <div className='mr-4  mt-[5px] cursor-pointer' onClick={()=>handleRemove(noti._id)}>
                            <RxCross1/>
                          </div>



                        </div>

                    </div>
                ))
            }


            </div>
       }

    </div>
  )
}

export default Notification
