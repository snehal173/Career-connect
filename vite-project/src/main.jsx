import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AuthContext from './context/AuthContext.jsx'
import UserContext from './context/UserContext.jsx'
import SocketContext from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <UserContext>
          <SocketContext>
          <App/>
          </SocketContext>
         
        </UserContext>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>,
)
