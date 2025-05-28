import React from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import dp from "../assets/profile_img.png"
import { userDataContext } from '../context/UserContext'

const Rightcontainer = () => {
  const {serverUrl}=useContext(authDataContext)
  const {handleGetProfile}=useContext(userDataContext)
  const [users,setUsers]=useState([]);
  const handleSuggetedUsers=async()=>{
    try{
      const result=await axios.get(serverUrl+"/api/user/suggesteduser",{withCredentials:true})
        console.log(result);
        setUsers(result.data.suggestedUsers);

    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    handleSuggetedUsers()
  },[])
  return (
    <div
    className='w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg hidden lg:flex flex-col p-[20px]' >
       <h1 className='text-xl font-semibold text-gray-700'>Suggested Users</h1>
      {
        users.length>0 && 
        <div className='flex flex-col gap-[10px]'>
         
        {
          users.map((u,index)=>(
            <div className='flex items-center gap-[10px] mt-[10px] cursor-pointer rounded-lg hover:bg-gray-200 p-[5px] ' onClick={()=>handleGetProfile(u.username)}>
              <div className='w-[40px] h-[40px] rounded-full overflow-hidden '>
                <img src={u.profileImage||dp} alt="profileimg"/>
               </div>
                <div>
                <div className='text-[19px] font-semibold text-gray-700'>
                                      {`${u.firstname} ${u.lastname}`}
                </div>
                <div className='text-[13px]  text-gray-700'>
                {`${u.headline} `}
                </div>
                </div>
              
            </div>
          ))
        }
      
        
        
        
      </div>
      }
      {
        users.length==0 && <div className='text-xl font-semibold text-gray-700'>No suggested users</div>
      }
    </div>
  )
}

export default Rightcontainer