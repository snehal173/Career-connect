import React, { useContext, useRef, useState } from 'react'
import { RxCross1 } from "react-icons/rx"
import { userDataContext } from '../context/UserContext'
import logo from "../assets/profile_img.png"
import {FiCamera, FiPlus} from "react-icons/fi"
import { authDataContext } from '../context/AuthContext'

import axios from 'axios'
const EditProfile = () => {
  const {setEdit,userData}=useContext(userDataContext)
  const [firstname,setFirstname]=useState(userData.firstname || "");
  const [lastname,setLastname]=useState(userData.lastname ||"");  
  const [username,setUsername]=useState(userData.username || "");
  const [gender,setGender]=useState(userData.gender ||"");
  const [location,setLocation]=useState(userData.location || "");
  const [headline,setHeadline]=useState(userData.headline || "");
  const [skills,setSkills]=useState(userData.skills || []);
  const [newskills,setNewskills]=useState("");
  const [education,setEducation]=useState(userData.education || []);
  const [neweducation,setNeweducation]=useState({
    college:"",
    degree:"",
    fieldOfStudy:"",
  });
  const [experience,setExperience]=useState(userData.experience || []);
  const [newexperience,setNewexperience]=useState({
    title:"",
    company:"",
    description:"",
  })
  const [loading,setLoading]=useState(false);
  const profileImageref=useRef(null);
  const coverImageref=useRef( null);
  
  const [frontendProfileImage,setFrontendProfileImage]=useState(userData.profileImage|| logo);
  const [backendProfileImage,setbackendProfileImage]=useState(null);

  const [frontendCoverImage,setFrontendCoverImage]=useState(userData.coverImage || null);;
  const [backendCoverImage,setbackendCoverImage]=useState(null);

  const {serverUrl}=useContext(authDataContext)
  const {setUserData}=useContext(userDataContext)
  function handleSkills(e){
    e.preventDefault();
    if(newskills && !skills.includes(newskills)){
      setSkills([...skills,newskills]);
     
    }
    setNewskills("");
  }

  function handleEducation(e){
    e.preventDefault();
    if(neweducation.college && neweducation.degree && neweducation.fieldOfStudy && !education.includes(neweducation)){
      setEducation([...education,neweducation]);
    }
    setNeweducation({
      college:"",
    degree:"",
    fieldOfStudy:"",
    });
  }
  function handleExperience(e){
    e.preventDefault();
    if(newexperience.title && newexperience.company && newexperience.description && !experience.includes(newexperience)){
      setExperience([...experience,newexperience]);
    }
    setNewexperience({
    title:"",
    company:"",
    description:"",
    });
  }

  function removeSkill(index, e) {
    e.preventDefault();
    const newArray = skills.filter((_, i) => i !== index);
    setSkills(newArray);
  }

  function removeEducation(edu, e) {
    e.preventDefault();
    if(education.includes(edu)){
    const newArray = education.filter((e) => e !== edu);
    setEducation(newArray);
    }
    
  }

  
  function removeExperience(exp, e) {
    e.preventDefault();
    if(experience.includes(exp)){
    const newArray = experience.filter((e) => e !== exp);
    setExperience(newArray);
    }
    
  }

  function handleCoverImage(e){
    const file=e.target.files[0];
    setbackendCoverImage(file);
    setFrontendCoverImage(URL.createObjectURL(file));
  }

  function handleProfileImage(e){
    const file=e.target.files[0];
    setbackendProfileImage(file);
    setFrontendProfileImage(URL.createObjectURL(file));
  }

  const SaveDetailsHandler=async()=>{
     setLoading(true);
     try{
      const formdata=new FormData();
      formdata.append("firstname",firstname);
      formdata.append("lastname",lastname);
      formdata.append("username",username);
      formdata.append("gender",gender);
      formdata.append("location",location);
      formdata.append("headline",headline);
      formdata.append("skills",JSON.stringify(skills));
      formdata.append("education",JSON.stringify(education));
      formdata.append("experience",JSON.stringify(experience));
      
      if(backendCoverImage){
        formdata.append("coverImage",backendCoverImage);
      }
      if(backendProfileImage){
        formdata.append("profileImage",backendProfileImage);
      }

      const result=await axios.put(serverUrl+"/api/user/updateProfile",formdata,{withCredentials:true})
     // console.log(result);
      if(result.status===200){
        setUserData(result.data.user);
        setLoading(false);
        setEdit(false);
      }
     
     }catch(error){
      console.log(error);
     }
  }

  return (
    <div className='w-full h-[100vh] fixed top-0 z-[100] flex justify-center items-center'>
      <div className='w-full h-full bg-black opacity-[0.5] absolute top-0 left-0'></div>
      <div className='w-[90%] max-w-[500px] h-[600px] bg-white relative z-[200] overflow-auto shadow-lg rounded-lg p-[10px]'>
         <input type='file' accept='image/*'  hidden ref={profileImageref} onChange={handleProfileImage}/>
         <input type='file' accept='image/*'  hidden ref={coverImageref} onChange={handleCoverImage}/>
        < div className='absolute top-[20px] right-[20px] cursor-pointer'>
          <RxCross1 className='w-[25px] h-[25px] text-gray-800 font-bold' onClick={()=>setEdit(false)}/>
        </div>

        {/* upload cover image */}
        <div className='w-full h-[150px] bg-gray-400 rounded-lg mt-[40px] ' onClick={()=>coverImageref.current.click()}>
           <img src={frontendCoverImage} alt='' className='w-full'/>
            <FiCamera className='absolute right-[20px] top-[60px] w-[25px] h-[25px] text-white cursor-pointer'/>
        </div>
        <div className='w-[80px] h-[80px] overflow-hidden rounded-full absolute top-[150px] left-[30px] cursor-pointer  ' onClick={()=>profileImageref.current.click()} >
          <img src={frontendProfileImage} alt='img'/>
        </div>
        <div className='w-[20px] h-[20px] absolute top-[190px] rounded-full left-[97px] bg-blue-400 flex justify-center items-center'>
          <FiPlus className='text-white' />
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-[15px] mt-[50px]'>
          <input
          type='text'
          placeholder='FirstName'
          value={firstname}
          onChange={(e)=>{setFirstname(e.target.value)}}
          className='w-full h-[40px] border-2 border-gray-600 rounded-lg px-[10px] py-[15px]'
          />
           <input
          type='text'
          placeholder='LastName' 
          value={lastname}
          onChange={(e)=>{setLastname(e.target.value)}}
           className='w-full h-[40px] border-2 border-gray-600 rounded-lg px-[10px] py-[15px]'
          />
           <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
           className='w-full h-[40px] border-2 border-gray-600 rounded-lg px-[10px] py-[15px]'
          />
           <input
          type='text'
          placeholder='Gender(Male/Female/Others)'
          value={gender}
          onChange={(e)=>{setGender(e.target.value)}}
           className='w-full h-[40px] border-2 border-gray-600 rounded-lg px-[10px] py-[15px]'
          />
           <input
          type='text'
          placeholder='Location'
          value={location}
          onChange={(e)=>{setLocation(e.target.value)}}
           className='w-full h-[40px] border-2 border-gray-600 rounded-lg px-[10px] py-[15px]'
          />
           <input
          type='text'
          placeholder='Headline'
          value={headline}
          onChange={(e)=>{setHeadline(e.target.value)}}
          className='w-full h-[40px] border-2 border-gray-600 rounded-lg px-[10px] py-[15px]'
          />

          <div className='w-full flex flex-col items-start justify-center gap-[10px] p-[10px] border-2 border-gray-600'>
            <h1 className='text-[19px] font-semibold'>Skills</h1>
            {
              skills && <div className='flex items-center justify-start gap-[10px] flex-wrap'>
                  {skills.map((skill,index)=>{
                       return(
                        <div key={index} className='flex justify-center items-center gap-1.5 bg-blue-400 font-serif text-[18px] text-white border-2 rounded-full px-[10px] py-[2px]'>
                           {skill}
                           <RxCross1 fontSize={10} onClick={(e) => removeSkill(index, e)} className='cursor-pointer' />
                        </div>
                    )
                  })}
                </div>
            }

           <div className='w-full flex flex-col items-start justify-center gap-[10px] ' >
           <input
             type='text'
             placeholder='Add Skills'
             value={newskills}
             onChange={(e)=>{setNewskills(e.target.value)}}
             className='w-full h-[40px] border-2 border-gray-600 rounded-lg px-[10px] py-[15px]'
            />
            <button className='text-blue-500 cursor-pointer text-[16px] font-semibold'onClick={handleSkills}  >Add</button>
           </div>
          </div>

          <div className='w-full flex flex-col items-start justify-center gap-[10px] p-[10px] border-2 border-gray-600'>
            <h1 className='text-[19px] font-semibold'>Education</h1>
            {
              education && <div className='flex flex-col items-start w-full justify-center gap-[10px] flex-wrap'>
                  {education.map((edu,index)=>{
                       return(
                        <div key={index} className='flex w-full justify-between items-center gap-1.5 bg-blue-400 font-serif text-[18px] text-white border-2 rounded-lg px-[10px] py-[2px]'>
                           <div className='flex flex-col items-start justify-center gap-[5px]'> 
                            <div>College:{edu.college}</div>
                            <div>Degree:{edu.degree}</div>
                            <div>Field Of Study:{edu.fieldOfStudy}</div>
                           </div>
                           <RxCross1 fontSize={20} onClick={(e) =>removeEducation(edu, e)} className='cursor-pointer' />
                        </div>
                    )
                  })}
                </div>
            }

           <div className='w-full flex flex-col items-start justify-center gap-[10px] ' >
           <input
             type='text'
             placeholder='Enter College Name'
             value={neweducation.college}
             onChange={(e)=>setNeweducation({...neweducation,college:e.target.value})}
             className='w-full h-[40px] border-2 border-gray-600 rounded-lg px-[10px] py-[15px]'
            />
             <input
             type='text'
             placeholder='Enter Degree Name'
             value={neweducation.degree}
             onChange={(e)=>setNeweducation({...neweducation,degree:e.target.value})}
             className='w-full h-[40px] border-2 border-gray-600 rounded-lg px-[10px] py-[15px]'
            />
             <input
             type='text'
             placeholder='Enter Your Field Of Study'
             value={neweducation.fieldOfStudy}
             onChange={(e)=>setNeweducation({...neweducation,fieldOfStudy:e.target.value})}
             className='w-full h-[40px] border-2 border-gray-600 rounded-lg px-[10px] py-[15px]'
            />
            <button className='text-blue-500 cursor-pointer text-[16px] font-semibold'onClick={handleEducation}  >Add</button>
           </div>
          </div>
          

          <div className='w-full flex flex-col items-start justify-center gap-[10px] p-[10px] border-2 border-gray-600'>
            <h1 className='text-[19px] font-semibold'>Experience</h1>
            {
              experience && <div className='flex flex-col items-start w-full justify-center gap-[10px] flex-wrap'>
                  {experience.map((exp ,index)=>{
                       return(
                        <div key={index} className='flex w-full justify-between items-center gap-1.5 bg-blue-400 font-serif text-[18px] text-white border-2 rounded-lg px-[10px] py-[2px]'>
                           <div className='flex flex-col items-start justify-center gap-[5px]'> 
                            <div>Title:{exp.title}</div>
                            <div>Company:{exp.company}</div>
                            <div>Description:{exp.description}</div>
                           </div>
                           <RxCross1 fontSize={20} onClick={(e) =>removeExperience(exp, e)} className='cursor-pointer' />
                        </div>
                    )
                  })}
                </div>
            }

           <div className='w-full flex flex-col items-start justify-center gap-[10px] ' >
           <input
             type='text'
             placeholder='Enter title'
             value={newexperience.title}
             onChange={(e)=>setNewexperience({...newexperience,title:e.target.value})}
             className='w-full h-[40px] border-2 border-gray-600 rounded-lg px-[10px] py-[15px]'
            />
             <input
             type='text'
             placeholder='Enter Company Name'
             value={newexperience.company}
             onChange={(e)=>setNewexperience({...newexperience,company:e.target.value})}
             className='w-full h-[40px] border-2 border-gray-600 rounded-lg px-[10px] py-[15px]'
            />
             <input
             type='text'
             placeholder='Enter job description'
             value={newexperience.description}
             onChange={(e)=>setNewexperience({...newexperience,description:e.target.value})}
             className='w-full h-[40px] border-2 border-gray-600 rounded-lg px-[10px] py-[15px]'
            />
            <button className='text-blue-500 cursor-pointer text-[16px] font-semibold'onClick={handleExperience}  >Add</button>
           </div>

           <button className='bg-blue-500 rounded-full w-[100%] h-[50px] text-white mt-[30px] text-xl cursor-pointer' onClick={SaveDetailsHandler} disabled={loading}>{loading ?"Saving...":"Save Profile"}</button>
          </div>



        </div>

      </div>

    </div>
  )
}

export default EditProfile