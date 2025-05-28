import React, { useContext } from 'react'
import { MdEdit } from "react-icons/md";
import logo from "../assets/profile_img.png"
import {FiCamera, FiPlus} from "react-icons/fi"
import { userDataContext } from '../context/UserContext';
const Leftcontainer = () => {
    const {userData,setEdit}=useContext(userDataContext)
    console.log(userData);
  return (
    <div className='w-full  lg:w-[25%] min-h-[200px] bg-white flex flex-col shadow-lg justify-start gap-8 rounded-lg relative '>
       
       <div className='w-full h-[100px] bg-gray-300 rounded overflow-hidden flex items-center justify-center  cursor-pointer ' onClick={()=>setEdit(true)}>
          <img src={userData.coverImage || ""} className='w-full'/>
          <FiCamera className='absolute right-[20px] top-[20px] w-[25px] h-[25px] text-white cursor-pointer'/>
        </div>
        <div className='w-[70px] h-[70px] overflow-hidden rounded-full absolute top-[63px] left-[40px] cursor-pointer ' onClick={()=>setEdit(true)}>
          <img src={userData.profileImage || logo} alt='img'/>
          
        </div>
        <div className='w-[20px] h-[20px] absolute top-[92px] rounded-full left-[100px] bg-blue-400 flex justify-center items-center'>
            <FiPlus className='text-white' />
        </div>
       <div className='pl-[20px] mt-1' >
       <h2  className=' text-gray-700 text-2xl font-semibold'>{`${userData.firstname} ${userData.lastname}`}</h2>
        <p className='text-[18px] text-gray-700'>{userData.headline || "hi"}</p>
        <p className='text-[16px] text-gray-700'>{userData.location || "India"} </p>
       </div>
       
       <button className='mb-[20px] mt-[-20px] w-full text-[16px] text-blue-400 border-2 rounded-full border-blue-400 py-1 flex items-center justify-center gap-[10px] cursor-pointer'
       onClick={()=>setEdit(true)}>
       Edit Profile
       <MdEdit className='text-[16px]' />
       </button>

       
    </div>
  )
}

export default Leftcontainer