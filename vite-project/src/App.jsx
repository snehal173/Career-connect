
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'

import Network from './pages/Network'
import Profile from './pages/Profile'
import Notification from './pages/Notification'

function App() {
  let {userData}=useContext(userDataContext);

return (
    <>
    <Routes>
    <Route
    path="/"
    element={userData._id ?<Home />:<Navigate to="/login" replace />}
    />
    <Route path='/signup' element={userData._id?<Navigate to="/"/>:<Signup/>}></Route>
    <Route path='/login' element={userData._id?<Navigate to="/"/>:<Login/>}></Route>
    <Route path='/mynetwork' element={userData._id?<Network/>:<Login/>}></Route>
    <Route path='/profile' element={userData._id?<Profile/>:<Login/>}></Route>
    <Route path='/notification' element={userData._id?<Notification/>:<Login/>}></Route>
    </Routes>
    </>
  )
}

export default App
