import React, { createContext } from 'react'
export const authDataContext=createContext();
const serverUrl="http://localhost:4000"
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
