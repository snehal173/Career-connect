import React, { useContext, useState } from 'react'
import { IoIosSearch, IoIosTrendingUp } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import dp from "../assets/profile_img.png"
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import logo from "../assets/logo.jpeg"
const Navbar = () => {
  const [openpanel,setopenpanel]=useState(false);
 
  const [activeSearch,setActiveSearch]=useState(false);
  const {userData,setUserData,handleGetProfile}=useContext(userDataContext);
  const {serverUrl}=useContext(authDataContext);
  const navigate=useNavigate();
  const [searchInput,setSearchInput]=useState("")
  const [searchData,setSearchData]=useState([])
  const handleSignout=async()=>{
     try{
      const response=await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true});
      setUserData({});
      if(response.status===200){
      navigate('/login')
      }
      //console.log(response);
     }catch(error){
      console.log(error);
     }
  }

  const handleSearch=async()=>{
    try{
      let response=await axios.get(`${serverUrl}/api/user/search?query=${searchInput}`,{withCredentials:true})
      console.log(response);
      setSearchData(response.data)

    }catch(error){
      setSearchData([])
      console.log(error)
    }
  }
  useEffect(()=>{
    
         handleSearch()
    
  },[searchInput])
 
  return (
    <div className='w-full h-[70px] bg-white top-0 fixed shadow-lg z-10 flex justify-between md:justify-around items-center px-[10px]  left-0'>
    
     <div className='flex justify-center items-center gap-3 relative'>
        <img alt='logo' src={logo} className='w-[120px] h-[70px]' onClick={()=>{
          setActiveSearch(false)
          navigate('/')} } />
       {!activeSearch &&  <IoIosSearch fontSize={22} className='lg:hidden' onClick={()=>setActiveSearch(true)}/>}
        {searchData.length>0 &&
        <div className='absolute top-[90px] md:left-[200px] left-0 w-[100%] lg:w-[700px] bg-white min-h-[100px]  h-[500px] shadow-lg flex flex-col gap-[20px] px-[20px] pb-2 pt-2 overflow-auto'>
           {
             searchData.map((s,index)=>(
                  <div key={index} className='flex gap-[20px] items-center border-b-2 border-b-gray-300 p-[10px] cursor-pointer hover:bg-gray-300 rounded-lg' onClick={()=>handleGetProfile(s.username)} >
                     <div className='w-[60px] h-[60px] rounded-full overflow-hidden '>
                          <img src={s.profileImage||dp} alt="profileimg"/>
                     </div>
                     <div>
                      <div className='text-[19px] font-semibold text-gray-700'>
                        {`${s.firstname} ${s.lastname}`}
                     </div>
                      <div className='text-[16px]  text-gray-700'>
                        {`${s.headline} `}
                     </div>
                      </div>
                    
                  </div>
             )
               
             )
           }
        </div>
        }

        <form className={`lg:flex justify-center gap-[10px] items-center w-[200px] lg:w-[350px] h-[40px] bg-gray-100 rounded-lg px-[10px] py-[5px] ${!activeSearch? "hidden":"flex"}`}>
            <IoIosSearch fontSize={22} />
            <input
            type="text"
            value={searchInput}
            className='w-[330px] h-[35px]  placeholder:text-gray-600 px-2 border-none outline-none'
            placeholder='search'
            onChange={(e)=>setSearchInput(e.target.value)}
            />
        </form>
       

      </div>

      <div className='flex justify-center items-center gap-[20px]'>
         
         {
          openpanel && <div className='bg-white w-[300px] min-h-[300px] shadow-lg absolute top-[77px] rounded-lg flex flex-col items-center p-[20px] gap-[14px]  left-[60px] lg:left-[850px]'>
          <div className=' overflow-hidden '>
            <img src={userData.profileImage||dp} alt="profileimg" className='w-[60px] h-[60px] rounded-full'/>
          </div>
          <div className='text-[19px] font-semibold text-gray-700'>
           {`${userData.firstname} ${userData.lastname}`}
          </div>
          <button className='text-blue-500 border-2 border-blue-500 rounded-full w-[100%] h-[40px] cursor-pointer' onClick={()=>handleGetProfile(userData.username)}>View Profile</button>
          <div className="w-full border-t border-gray-600"></div>
           
          <div className='flex w-full gap-[10px]  items-center justify-start text-gray-600 cursor-pointer' onClick={()=>(navigate('/mynetwork'))}>
            <IoPeopleSharp fontSize={25}/>
            <h5>My Network</h5>
          </div>
           
          <button className='text-red-500 border-2 border-red-500 rounded-full w-[100%] h-[40px] cursor-pointer'
          onClick={handleSignout}>
           Sign Out
           </button>
         


        </div>
         }


        <div className='lg:flex flex-col items-center justify-center hidden cursor-pointer text-gray-600' onClick={()=>navigate('/')}>
        <FaHome  fontSize={25}/>
        <h5>Home</h5>
        </div>

        <div className='md:flex flex-col items-center justify-center hidden cursor-pointer text-gray-600' onClick={()=>(navigate('/mynetwork'))}>
        <IoPeopleSharp fontSize={25}/>
        <h5>My Network</h5>
        </div>

        <div className='flex flex-col items-center justify-center cursor-pointer text-gray-600' onClick={()=>navigate('/notification')}>
        <IoIosNotifications fontSize={25}/>
        <h5 className='hidden lg:block'>Notifications</h5>
        </div>

        <div className='w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer' onClick={()=>setopenpanel(!openpanel)}>
           <img src={userData.profileImage||dp} alt="profileimg"/>
        </div>
        
        

      </div>
     
      
    </div>
  )
}

export default Navbar