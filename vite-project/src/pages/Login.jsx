import React, { useContext, useState } from 'react'
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import bg from "../assets/loginbg.jpg"
import logo from "../assets/logo.jpeg"
const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [show,setShow]=useState(false);
    const {userData,setUserData}=useContext(userDataContext);
    const navigate=useNavigate();
   let {serverUrl}=useContext(authDataContext)
    const SubmitHandler=async(e)=>{
      e.preventDefault();
      try{
       
        const response=await axios.post(serverUrl+"/api/auth/login",{
          email:email,
          password:password
        },{withCredentials:true});
        console.log(response);
        if(response.status==200){
            const data=response.data;
            setUserData(response.data.user);
            navigate('/')
            setPassword('');
            setEmail('');
            console.log(userData);
        }
        
        
        
      
       }catch(error){
         console.log(error);
        }
    
    }

  return (
    <div className='w-full h-screen flex flex-col lg:flex-col items-center justify-start gap-10 '>
        <div className='fixed mt-[-40px] left-0 flex justify-start'>
                     <img alt ="logo" src={logo} className='w-[100px] h-[100px] lg:w-[200px] lg:h-[200px]'/>
                </div>
        <div className='flex  flex-col lg:flex-row  gap-[20px] lg:gap-[80px] justify-center items-center lg:mt-[150px] '>
          <div>
            <img src={bg} className='rounded-lg  '/>
          </div> 
        <form  onSubmit={SubmitHandler}
         className='w-[90%] max-w-[400px] h-[400px] md:shadow-xl flex flex-col justify-center items-center gap-[10px] p-[15px]'>
         <h1 className='text-gray-800 text-[30px] font-semibold mb-[30px]'>Log In</h1>
        <input
            placeholder='Enter your Email'
            type='email'
            value={email}
            className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md'
            onChange={(e)=>setEmail(e.target.value)}
         />

            <div className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px]  rounded-md relative '>
             <input
              placeholder='Enter your Password'
              required
              type={show?"text":"password"}
              value={password}
              className='w-full h-full  border-none text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md '
              onChange={(e)=>setPassword(e.target.value)}
              /> 
              <span className='absolute right-[20px] top-[10px] font-semibold text-blue-600 cursor-pointer' 
              onClick={()=>setShow(prev=>!prev)}
              >{show?"hidden":"show"}</span>
             </div>
        
        <button className='bg-blue-600 rounded-full w-[100%] h-[50px] text-white mt-[30px] text-xl cursor-pointer' type='submit'>
            Sign In
        </button>
        <div className='flex gap-2 justify-center items-center'>
                <p>Want to create New Account?</p>
                <Link className='text-blue-600 cursor-pointer' to='/signup'>Sign Up</Link>
        </div>

        </form>
        </div>

        
    </div>
  )
}

export default Login