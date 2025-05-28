import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const userDataContext=createContext();
const UserContext = ({children}) => {
    const [userData,setUserData]=useState({});
    const [edit,setEdit]=useState(false)
    const [postPanel,setPostPanel]=useState(false)
    const {serverUrl}=useContext(authDataContext)
    const [posts,setPosts]=useState([]);
    const [profileData,setProfileData]=useState([]);
    const navigate=useNavigate();
    //getting user from the backend
    const getCurrentUser=async()=>{
        try{
            const response=await axios.get(serverUrl+"/api/user/profile",{withCredentials:true});
          //  console.log(response);
           // console.log(response.data.user);
            setUserData(response.data.user);
        }catch(error){
           console.log(error);

        }
    }

    //getting all the posts 
    const fetchPosts=async()=>{
        try{
            const response=await axios.get(serverUrl+"/api/post/fetchPosts",{withCredentials:true});
           // console.log(response);
            setPosts(response.data.posts);
        }catch(error){
            console.log(error);
        }
    }

    const handleGetProfile=async (userName)=>{
        try{
            const response=await axios.get(serverUrl+`/api/user/currentprofile/${userName}`,{withCredentials:true});
            console.log(response);
            setProfileData(response.data.user);
            navigate("/profile")
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getCurrentUser();
        fetchPosts();
        
    },[])
    
   
    const value={userData,setUserData,edit,setEdit,postPanel,setPostPanel,posts,setPosts,fetchPosts,handleGetProfile,profileData,setProfileData};
    
  return (
    
        <userDataContext.Provider value={value}>
        {children}
        </userDataContext.Provider>
        
    
  )
}

export default UserContext