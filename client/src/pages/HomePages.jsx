import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChartContainer from '../components/ChartContainer'
import RightSidebar from '../components/RightSidebar'

function HomePages() {
    const [seletedUser , setSelectedUser] = useState(false);
  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
     <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1
      relative  ${seletedUser? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2'}`}>
        <Sidebar seletedUser={seletedUser} setSelectedUser={setSelectedUser}/>
        <ChartContainer seletedUser={seletedUser} setSelectedUser={setSelectedUser} />
        <RightSidebar seletedUser={seletedUser} setSelectedUser={setSelectedUser}/>
     </div>
    </div>
  )
}

export default HomePages
