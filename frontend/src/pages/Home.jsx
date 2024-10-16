import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import Sidebar from './components/Sidebar'
import Login from './components/login/Login'
import Users from './components/Users'
import CreateTask from './components/CreateTask'
import getUser from './fetchHooks/getUser'
import MyTasks from './components/MyTasks'
import Ai from './components/Ai'
export default function Home() {
  const { user } = getUser()
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(prev => !prev)
  }
  const [items, setItems] = useState(0)

  return (
    <div className='bg-black relative h-[2500px] lg:h-[1100px]'>
      <div className='absolute left-5  top-5 z-50 lg:hidden'>
        {isOpen ? <MdClose onClick={handleOpen} className='text-3xl text-gray-200 cursor-pointer' /> : <FaBars onClick={handleOpen} className='text-2xl text-gray-200 cursor-pointer ' />}
      </div>
      <div className='flex '>
        <Sidebar user={user} items={items} setItems={setItems} isOpen={isOpen}  setIsOpen={setIsOpen} />
        <div className=' w-full py-2 px-3 lg:px-10'>
          <div className='max-w-3xl   mx-auto bg-slate-950 shadow shadow-white lg:max-w-7xl min-h-96 rounded-3xl px-5 lg:px-0'>
            {items == 1 && <MyTasks />}
            {items == 3 && <Users />}
            {items == 4 && <CreateTask />}
            {items == 6 && <Login />}
            {items == 7 && <Ai />}
          </div>
        </div>
      </div>
    </div>

  )
}
