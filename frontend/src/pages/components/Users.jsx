import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HiOutlineUsers } from "react-icons/hi2";


export default function Users() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function fetchUsers() {
            await axios.get('http://localhost/task/controlers/getAllUsers.php').then(res => setUsers(res.data.data))
        }
        fetchUsers()
    }, [])
    return (
        <div className='mt-10'>
            <div className='py-8 px-5 flex justify-between'>
                <h1 className='text-5xl text-gray-300 '>Users</h1>
                <HiOutlineUsers className='w-10 h-10 text-gray-300' />
            </div>
            <div className='grid pb-5 grid-cols-2 lg:grid-cols-4 gap-10 text-gray-200 max-w-sm lg:max-w-4xl place-items-center mx-auto mt-5'>
                {users.map(item => <div key={item.id} className=' flex-col flex items-center hover:scale-110 duration-150 ease-linear cursor-pointer group'>
                    <div className='w-14 h-14'>
                        <img src={item.img_src} alt="pfp" className='rounded-full w-full h-full object-cover object-center' />
                    </div>
                    <h1 className=' group-hover:text-green-500 duration-150 ease-linear'>{item.username}</h1>
                    <div className='w-10 h-[1px] mt-1 bg-white group-hover:w-20 duration-300 ease-linear' />
                </div>)}

            </div>
        </div>
    )
}
