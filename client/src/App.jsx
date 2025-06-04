import React, { useContext } from 'react'
import {Navigate, Route , Routes , } from 'react-router-dom'
import HomePages from './pages/HomePages'
import LoginPages from './pages/LoginPages'
import ProfilePage from './pages/ProfilePage'

import {Toaster} from 'react-hot-toast'
import { AutoContext } from './context/AutoContext'

function App() {
  const {authUser} = useContext(AutoContext)
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Toaster/>

      <Routes>
        <Route  path='/'  element={authUser ?  <HomePages/> : <Navigate to="/login" />} />
        <Route  path='/login'  element={!authUser ? <LoginPages/>: <Navigate to="/" />} />
        <Route  path='/profile'  element={authUser ? <ProfilePage/>: <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
