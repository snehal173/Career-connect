import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import img from "../assets/download.jpeg"
import logo from "../assets/logo.jpeg"

const Signup = () => {
    let {serverUrl}=useContext(authDataContext)
    const [firstname,setFirstname]=useState('');
    const [lastname,setLastname]=useState('');
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [show,setShow]=useState(false);
    const {userData,setUserData}=useContext(userDataContext);
    const navigate=useNavigate;
    async function SubmitHandler(e){
        e.preventDefault();
       // setLoading(true);
       try{
       
        const response=await axios.post(serverUrl+"/api/auth/signup",{
            firstname:firstname,
            lastname:lastname,
            username:username,
            email:email,
            password:password
        },{withCredentials:true});
        console.log(response);
        if(response.status==200){
           // const data=response.data;
            setUserData(response.data.user);
            navigate("/");
            setFirstname('');
            setLastname('');
            setPassword('');
            setEmail('');
            setUsername('');
            console.log(userData);
        }
      //  setLoading(false);
       
       }catch(error){
         console.log(error);
        }
    }
  return (
    <div className='w-full h-screen flex flex-col lg:flex-col items-center justify-start gap-10   '>
       
       <div className='fixed  lg-block mt-[-40px] left-0 flex justify-start'>
             <img alt ="logo" src={logo} className='w-[100px] h-[100px] lg:w-[200px] lg:h-[200px]'/>
        </div>
        <div className='flex  flex-col lg:flex-row gap-[20px] lg:gap-[80px] justify-center items-center lg:items-start mt-32  lg:mt-[100px]'>
            <div>
                <img src={img} className='rounded-lg '/>
            </div>
        <form onSubmit={SubmitHandler}
         className='w-[90%] max-w-[400px] h-[520px] bg-white md:shadow-xl flex flex-col justify-center gap-[10px] p-[15px] rounded-lg'>
           
                <h1 className='text-gray-800 text-[30px] font-semibold mb-[30px]'>Sign Up</h1>
                <input
                placeholder='Enter your firstname'
                required
                type='text'
                value={firstname}
                className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md'
                onChange={(e)=>setFirstname(e.target.value)}
                />
                 <input
                placeholder='Enter your lastname'
                required
                type='text'
                value={lastname}
                className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md'
                onChange={(e)=>setLastname(e.target.value)}
                />

               <input
               placeholder='Enter your Username'
               required
               type='text'
               className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md'
               value={username}
               onChange={(e)=>setUsername(e.target.value)}
               />

              <input
              placeholder='Enter your Email'
              required
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

            <button className='bg-blue-600 rounded-full w-[100%] h-[50px] text-white mt-[30px] text-xl cursor-pointer' type='submit' >Signup</button>
            <div className='flex gap-2 justify-center items-center'>
                <p>Already have an account?</p>
                <Link className='text-blue-600 cursor-pointer' to='/login'>Sign In</Link>
            </div>
           

          
           
        </form>
        </div>
    </div>
  )
}

export default Signup