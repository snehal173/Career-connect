import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {FiCamera, FiPlus} from "react-icons/fi"
import { MdEdit } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import logo from "../assets/profile_img.png"
import { authDataContext } from '../context/AuthContext';

import EditProfile from '../components/EditProfile';
import Post from '../components/Post';
import ConnectionButton from '../components/ConnectionButton';
const Profile = () => {
    const {userData,edit,setEdit,posts,setPosts,profileData,setProfileData}=useContext(userDataContext)
   // console.log(posts);
   console.log(profileData);
    console.log(userData);
  //  let [userConnection,setUserConnection]=useState([]);
    const {serverUrl}=useContext(authDataContext)
    let [profilePost,setProfilePost]=useState([])
    // const handleGetUserConnection=async()=>{

    //     try{
    //         const response=await axios.get(`${serverUrl}/api/connection/getall`,{withCredentials:true});
    //         console.log(response); 
    //         setUserConnection(response.data);
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
    // useEffect(()=>{
    //     handleGetUserConnection();
    // },[])
   // console.log(posts);

    useEffect(()=>{
        
        const filteredPosts = posts.filter(

            (post) => post.author?._id == profileData._id
          );
         // console.log(filteredPosts);
          setProfilePost(filteredPosts);
    },[posts,profileData])
  return (
    <div className='w-full min-h-[100vh] bg-[#f0efe7] flex flex-col  items-center pt-[100px] '>
        <Navbar/>
        <div className='w-full max-w-[900px] min-h-[100vh] flex flex-col gap-[10px]'>
            {edit && <EditProfile/>}
            <div className='  bg-white pb-[40px] shadow-lg rounded-xl '>
                       <div className='relative'>
                       <div className='w-full h-[100px]  bg-gray-300 rounded overflow-hidden flex items-center justify-center  cursor-pointer ' onClick={()=>setEdit(true)}>
                          <img src={profileData.coverImage || ""} className='w-full'/>
                          <FiCamera className='absolute right-[20px] top-[20px] w-[25px] h-[25px] text-white cursor-pointer'/>
                        </div>
                        <div className='w-[70px] h-[70px] overflow-hidden rounded-full absolute top-[60px] left-[30px] cursor-pointer ' onClick={()=>setEdit(true)}>
                          <img src={profileData.profileImage || logo} alt='img'/>
                         
                        </div>
                        <div className='w-[20px] h-[20px] absolute top-[92px] rounded-full left-[88px] bg-blue-400 flex justify-center items-center'>
                            <FiPlus className='text-white' />
                        </div>
                       </div>
                        
                       <div className='pl-[20px] mt-7' >
                       <h2  className=' text-gray-700 text-2xl font-semibold'>{`${profileData.firstname} ${profileData.lastname}`}</h2>
                        <p className='text-[18px] text-gray-700'>{profileData.headline || "hi"}</p>
                        <p className='text-[16px] text-gray-700'>{profileData.location || "India"} </p>
                        <p className='text-[16px] text-gray-700'>{`${profileData?.connection?.length} connections `} </p>
                       </div>

                       
                       {
                        profileData._id ==userData._id &&
                        <button className='ml-[20px] mb-[20px] mt-[20px]  min-w-[150px] text-[16px] text-blue-400 border-2 rounded-full border-blue-400 py-1 flex items-center justify-center gap-[10px] cursor-pointer'
                       onClick={()=>setEdit(true)}>
                       Edit Profile
                       <MdEdit className='text-[16px]' />
                       </button>
                       }
                       {
                         profileData._id !=userData._id && 
                        <div className='ml-[20px] mt-[20px]'>  <ConnectionButton userId={profileData._id}/> </div>
                       }
                

            </div>

            <div className='w-full min-h-[100px] flex items-center p-[20px] text-[22px] text-gray-600 font-semibold bg-white shadow-lg rounded-lg '>
                {`Post ${profilePost.length}`}

               
            </div>

            {profilePost.map((post)=>{
                    return <Post id={post._id} description={post.description} image={post.image} like={post.like} comment={post.comment} author={post.author} createdAt={post.createdAt} />
            })}
            {
                profileData?.skills?.length>0 && <div className='w-full min-h-[100px] flex flex-col justify-center items-start gap-[5px]  p-[20px] font-semibold bg-white shadow-lg rounded-lg'>
            
           <div className=' text-[22px] text-gray-600 '>
              Skills 
            </div>

           <div className='flex flex-wrap justify-start items-center gap-[20px] text-gray-600'>
             {
            profileData.skills.map((skill,index)=>(
               <div key={index}  className='text-[20px] text-gray-600'>{skill}  </div>
            ))
           }
             {profileData._id ==userData._id &&  <button className=' mb-[20px] mt-[10px]  min-w-[150px] text-[16px] text-blue-400 border-2 rounded-full border-blue-400 py-1 flex items-center justify-center gap-[10px] cursor-pointer' onClick={()=>setEdit(true)}>
                Add Skills
            </button> }
            
            </div>
            </div>
            }



             {
                profileData?.education?.length>0 && <div className='w-full min-h-[100px] flex flex-col justify-center items-start gap-[15px]  p-[20px] font-semibold bg-white shadow-lg rounded-lg'>
            
           <div className=' text-[22px] text-gray-800 font-semibold '>
              Education 
            </div>

           <div className='flex flex-col flex-wrap justify-center items-start gap-[20px] text-gray-600'>
             {
            profileData.education.map((edu,index)=>(
             <div key={index} className='flex flex-col gap-2 items-start justify-center'>
               <div className='text-[20px]'>College:{edu.college} </div>
              <div className='text-[20px]'> Degree:{edu.degree} </div>
              <div className='text-[20px]'> FieldOfStudy:{edu.fieldOfStudy} </div>
             </div>   
            ))
           }
             {profileData._id ==userData._id &&  <button className=' mb-[20px] mt-[10px]  min-w-[150px] text-[16px] text-blue-400 border-2 rounded-full border-blue-400 py-1 flex items-center justify-center gap-[10px] cursor-pointer' onClick={()=>setEdit(true)}>
                Add Education
            </button> }
            
            </div>
            </div>
            }

            {
            profileData?.experience?.length>0 && <div className='w-full min-h-[100px] flex flex-col justify-center items-start gap-[15px]  p-[20px] font-semibold bg-white shadow-lg rounded-lg'>
            
           <div className=' text-[22px] text-gray-800 font-semibold '>
              Experience
            </div>

           <div className='flex flex-col flex-wrap justify-center items-start gap-[20px] text-gray-600'>
             {
            profileData.experience.map((exp,index)=>(
             <div key={index} className='flex flex-col gap-2 items-start justify-center'>
               <div className='text-[20px]'>Title: {exp.title} </div>
              <div className='text-[20px]'> Company: {exp.company} </div>
              <div className='text-[20px]'> Description: {exp.description} </div>
             </div>   
            ))
           }
           {profileData._id ==userData._id &&  <button className=' mb-[20px] mt-[10px]  min-w-[150px] text-[16px] text-blue-400 border-2 rounded-full border-blue-400 py-1 flex items-center justify-center gap-[10px] cursor-pointer' onClick={()=>setEdit(true)}>
                Add Experience
            </button> }
            
            </div>
            </div>
            }

        </div>

    </div>
  )
}

export default Profile
