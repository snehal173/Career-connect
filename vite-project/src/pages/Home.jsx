import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Leftcontainer from '../components/Leftcontainer'
import Middlecontainer from '../components/Middlecontainer'
import Rightcontainer from '../components/Rightcontainer'
import EditProfile from '../components/EditProfile'
import  { userDataContext } from '../context/UserContext'
import { useContext } from 'react'
import CreatePost from '../components/CreatePost'

const Home = () => {
  const {edit,setEdit,postPanel,setPostPanel,fetchPosts}=useContext(userDataContext)
   useEffect(()=>{
    fetchPosts()
  },[])
  return (
    <div className='w-full min-h-[100vh] bg-[#f0efe7] pt-[100px] flex lg:items-start items-center justify-center gap-[20px] px-[20px] flex-col lg:flex-row'>
      <Navbar/>
      {edit && <EditProfile />}  
      <Leftcontainer/>
      {postPanel && <CreatePost />}
      <Middlecontainer/>
      <Rightcontainer/>
    </div>
  )
}

export default Home
