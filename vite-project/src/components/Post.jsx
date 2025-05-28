import React, { useContext, useEffect, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { SocketDataContext } from '../context/SocketContext'
import logo from "../assets/profile_img.png"
import moment from 'moment'
import {  FaRegThumbsUp } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { IoSend } from "react-icons/io5";

import ConnectionButton from './ConnectionButton';



const Post = ({id,like,author,comment,image,description,createdAt}) => {
   //console.log("Author is",author);
  
    const {userData,fetchPosts,handleGetProfile}=useContext(userDataContext)
    const [read,setRead]=useState(false);
    const {serverUrl}=useContext(authDataContext);
    const [commentData,setCommentData]=useState('');
    const [likes,setLikes]=useState([]);
    const [comments,setComments]=useState([]);
    const [showComments,setShowComments]=useState(false);
    const { socket } = useContext(SocketDataContext);
   const likepostHandler=async()=>{
      try{
         const response=await axios.get(serverUrl+`/api/post/like/${id}`,{withCredentials:true});
         console.log(response);
         if(response.status===200){
           setLikes(response.data.post.like);
         }


      }catch(error){
         console.log(error);
      }
   }
  
   
   const commentHandler=async(e)=>{
      e.preventDefault();
      try{
         const response=await axios.post(serverUrl+`/api/post/comment/${id}`,{content:commentData},
         {withCredentials:true});
         console.log(response);
         if(response.status===200){
            setComments(response.data.populatedPost.comment);
            console.log("comments is",comments);
            setCommentData('');
         }

      }catch(error){
         console.log(error) ;
         }
   }

   useEffect(()=>{
      socket.on("likeUpdated",({postId,likes})=>{
         if(postId==id){
            console.log("like even happended");
            setLikes(likes)
         }
      })
      socket.on("commentAdded",({postId,comm})=>{
         if(postId==id){
            setComments(comm)
         }
      })
      return ()=>{
         socket.off("likeUpdated")
         socket.off("commentAdded")
      }
   },[id])

   useEffect(()=>{
      setLikes(like)
      setComments(comment)
   },[like,comment]);



  return (
    <div className='bg-white w-full min-h-[200px] flex flex-col gap-[5px] shadow-lg px-[20px] py-[20px] ' >
       <div className='w-full flex justify-between items-center'>
        <div className='flex justify-start items-center gap-[10px]' onClick={()=>handleGetProfile(author.username)}>
           <img src={author.profileImage || logo} className='w-[80px] h-[80px] rounded-full cursor-pointer'/>
           <div className='flex flex-col justify-center ' >
           <div className=' text-gray-700 text-2xl font-semibold'>{`${author.firstname} ${author.lastname}`}</div>
           <p className='text-[18px] text-gray-700'>{author.headline || ""}</p>
           <div className='text-16px'>{moment(createdAt).fromNow()}</div>
           </div>

        </div>

        <div>
         {userData._id !=author._id &&   <ConnectionButton  userId={author._id}/> }
       
        </div>
        
        
         
       </div>

       <div className={`mt-2 w-full ${read ? "":"max-h-[100px] overflow-hidden"} `}>{description}</div>
       <div className='cursor-pointer' onClick={() => setRead(prev => !prev)}>{!read ?"read more...":"read less..."}</div>
       {image &&  <img className='w-full  h-[400px] overflow-hidden rounded-lg' src={image}/>}

       <div className='w-full flex justify-between items-center mt-1'>
        <div className='flex justify-start items-center gap-3'>
            <FaRegThumbsUp fontSize={20} className='text-blue-400 cursor-pointer'/>
           <span>{likes.length}</span>
        </div>
        <div className='flex items-center gap-3 cursor-pointer' onClick={()=>setShowComments(prev => !prev)}>
            <span>{comments.length}</span>
            <div>comments</div>
        </div>

        
       </div>
       <div className="w-full h-0.5 bg-gray-700 my-4"></div>
       <div className='w-full flex justify-start items-center gap-5'>
        <div className='flex justify-center items-center gap-2 cursor-pointer' onClick={likepostHandler}>
            <FaRegThumbsUp className={likes.includes(userData._id) ? "text-blue-500" : ""}/>
            <div className={likes.includes(userData._id) ? "text-blue-500" : ""}>
               {likes.includes(userData._id) ? "Liked " : "Like" }
            </div>

        </div>
        <div  className='flex justify-center items-center gap-2 cursor-pointer' onClick={()=>setShowComments(prev => !prev)} >
        <FaRegCommentDots />
           <div>Comment</div>
        </div>

       
       </div>
       <div >
         <form className='w-full flex justify-between items-center mt-2  h-[35px] border-2 border-gray-500 rounded-full ' onSubmit={commentHandler}>
        
         <input 
         type="text"
         value={commentData}
         onChange={(e) => setCommentData(e.target.value)}
         placeholder="Leave a Comment"
         className="w-full px-4 pr-10 outline-none"
          />
        <button type="submit" className="px-2 text-blue-500 cursor-pointer">
        <IoSend />
        </button>
        </form>
        {showComments && <div>
            { 
               comments.map((c,index)=>
                  (
                     <div key={index} className='flex flex-col border-b-2 border-b-gray-500 p-3 gap-[10px]'>
                        <div className='flex justify-start items-center gap-3 mt-2 '> 
                           <img src={c.user.profileImage|| logo} className='rounded-full w-[50px] h-[50px] overflow-hidden' />
                           <div className=' text-gray-700 text-[18px] '>{`${c.user.firstname} ${c.user.lastname}`}</div>
                          
                        </div>
                        <div>{c.content} </div>
                        
                     </div>
                  )
               )
            }

         </div>
         }
        </div>
         
    </div>
  )
}

export default Post
