import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import logo from "../assets/profile_img.png"


import Post from './Post';
const Middlecontainer = () => {
  const {userData,setPostPanel,posts}=useContext(userDataContext)
  
  
  return (
    <div className='w-full lg:w-[50%] min-h-[200px] bg-[#f0efe7] flex flex-col gap-[20px] '>
      <div className='w-full flex bg-white items-center justify-center gap-[20px] px-[40px] py-[20px]'>
        <img src={userData.profileImage || logo} alt='' className='w-[70px] h-[70px] rounded-full'/>
        <div className='w-full h-[60px] border-2 border-gray-500 rounded-full text-[20px] px-3 flex flex-col justify-center cursor-pointer ' onClick={()=>setPostPanel(true)}>Start a post</div>
        
      </div>
      {
        posts.map((post,index)=>{
          return(
              <div key={index}>
                <Post  id={post._id} description={post.description} image={post.image} like={post.like} comment={post.comment} author={post.author} createdAt={post.createdAt} />
                  
              </div>

          )
      })
      }
      
    </div>
  )
}

export default Middlecontainer
