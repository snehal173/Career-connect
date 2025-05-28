import React, { createContext } from 'react'
export const authDataContext=createContext();
const serverUrl="https://career-connect-backend-kdpt.onrender.com"
let value={
    serverUrl
}

const AuthContext = ({children}) => {
  return (
    <div>
        <authDataContext.Provider value={value}>
          {children}
        </authDataContext.Provider>
       
    </div>
  )
}

export default AuthContext
