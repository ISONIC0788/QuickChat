import React from 'react'
import {Route , Routes , } from 'react-router-dom'
import HomePages from './pages/HomePages'
import LoginPages from './pages/LoginPages'
import ProfilePage from './pages/ProfilePage'

import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Toaster/>

      <Routes>
        <Route  path='/'  element={<HomePages/>} />
        <Route  path='/login'  element={<LoginPages/>} />
        <Route  path='/profile'  element={<ProfilePage/>} />
      </Routes>
    </div>
  )
}

export default App
