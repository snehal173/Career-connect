import React, { useContext,useState,useRef } from 'react'
import { GrGallery } from "react-icons/gr";
import { RxCross1 } from 'react-icons/rx';
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import logo from "../assets/profile_img.png"
const CreatePost = () => {
    const {userData,postPanel,setPostPanel,fetchPosts}=useContext(userDataContext)
    const {serverUrl}=useContext(authDataContext)
    const [frontendImage,setFrontendImage]=useState("");
    const [backendImage,setBackendImage]=useState("");
    const [description,setDescription]=useState("");
   
    const imageref=useRef(null);
    function handleImage(e){
        const file=e.target.files[0];
        setFrontendImage(URL.createObjectURL(file));
        setBackendImage(file);
        console.log(file);  
    }
    const handlePost=async()=>{
      try{
        let formdata=new FormData();
        formdata.append("description",description);
        if(backendImage){
            formdata.append("image",backendImage);
        }
        let response=await axios.post(serverUrl+"/api/post/create",formdata,{withCredentials:true});
        console.log(response);
        if(response.status===200){
            setPostPanel(false);
            fetchPosts();
            setDescription("");
            setFrontendImage("");
            setBackendImage("");
        }

      }catch(error){
        console.log(error);
      }
    }
  return (
   <div className='w-full h-[100vh] fixed top-0 z-[100] flex justify-center items-center'>
        <div className='w-full h-full bg-black opacity-[0.5] fixed top-0 left-0'></div>
        <div className='w-[90%] max-w-[500px] h-[600px] bg-white fixed z-[200] overflow-auto shadow-lg  p-[10px]'>
        <div className='w-full flex justify-between items-center px-[20px]'>
<div className='w-full flex justify-start items-center gap-[20px] '> 
 <img src={userData.profileImage || logo} alt='' className='w-[70px] h-[70px] rounded-full overflow-hidden'/>
 <div className='text-[18px] font-semibold'>{`${userData.firstname} ${userData.lastname}`} </div>
 </div>
 <RxCross1 className=' cursor-pointer' fontSize={25} onClick={()=>setPostPanel(false)}/>
 
 </div>


 <textarea
 value={description}
 onChange={(e)=>{setDescription(e.target.value)}}
 placeholder='what do you want to talk about' 
 className={`resize-none w-full ${frontendImage? "h-[300px]":"h-[400px]"} border-none outline-none px-[20px] py-[20px]`}
 />
  
  <input type='file' className='hidden' accept='image/*' id='file' ref={imageref} onChange={handleImage} />
  <div className='w-full h-[300px] overflow-hidden px-[20px] flex justify-center items-center'>
    <img src={frontendImage || ""} className='h-full rounded-lg'/>
  </div>
 

 <div>
 <GrGallery 
 className='text-gray-500 cursor-pointer px-[20px]'
 fontSize={60} 
 onClick={()=>imageref.current.click()}
 />
 
  <div className="border-t border-gray-700 my-4" > </div>

  <div className='flex justify-end'> 
  <button className='w-[90px] h-[40px] rounded-full cursor-pointer text-white text-[18px] bg-blue-600 mr-3' onClick={handlePost}>Post </button>
  </div>

  </div> 
  </div>
   </div>
    
  )
}

export default CreatePost


 
 
