import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { BsListTask } from "react-icons/bs";

export default function MyTasks() {
    const token = Cookies.get('token');
    const [tasks, setTasks] = useState([])
    let currentDate = new Date();
    useEffect(() => {

        async function fetchUserTask() {
            const formData = new FormData()
            formData.append('token', token);
            await axios.post('http://localhost/task/controlers/getUserTask.php', formData).then(res => setTasks(res.data.data)).catch(err => console.error(err))
        }
        fetchUserTask()
    }, [])

    function calculateDaysRemaining(deadline) {
        const taskDeadline = new Date(deadline); // Convert deadline to a Date object
        const differenceInTime = taskDeadline.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert to days
    
        return differenceInDays;
    }
    return (
        <div className=' text-gray-200 max-w-6xl py-5 mx-auto'>
            <div className='py-16 px-5 flex justify-between'>
                <h1 className='text-3xl lg:text-5xl text-gray-300 '>My Task</h1>
                <BsListTask className='w-10 h-10 text-gray-300' />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 ml-5 text-gray-300 font-light text-sm  gap-y-20'>
                <div className='flex flex-col space-y-5'>
                    <div className='w-64 h-16 bg-indigo-500 uppercase shadow shadow-white/50 rounded-2xl flex justify-center items-center'>
                        <h1>in progress</h1>
                    </div>
                    {tasks.filter(item=>item.status == 0).length > 0 ? tasks.filter(item=>item.status == 0).map(item =>
                        <div className='w-64 h-28 space-y-2 bg-slate-950 rounded-2xl opacity-100 flex flex-col justify-between py-3 items-center ease-linear cursor-pointer shadow shadow-white/80' key={item.id}>
                            <h1 className='text-xl uppercase'>{item.title}</h1>
                            <div className='flex justify-between w-full px-5 items-center'>
                                <p className='text-xs'>{item.deadline}</p>
                                <span className='text-xs'><strong className='text-red-600 text-base'>{calculateDaysRemaining(item.deadline)}</strong> days remaining</span>
                            </div>
                        </div>
                    ) : <div className='w-64 space-y-2 bg-slate-950 rounded-2xl opacity-100 flex flex-col justify-between py-3 items-center ease-linear cursor-pointer shadow shadow-white/80' >
                        <h1 className='text-xl uppercase text-white'>No Task </h1>
                    </div>}

                </div>
                <div className='flex flex-col space-y-5'>
                    <div className='w-64 h-16 bg-green-600 uppercase shadow shadow-white/50 rounded-2xl flex justify-center items-center'>
                        <h1>done tasks</h1>
                    </div>
                    {tasks.filter(item=>item.status == 1).length > 0 ? tasks.filter(item=>item.status == 1).map(item =>
                        <div className='w-64 h-28 space-y-2 bg-slate-950 rounded-2xl opacity-100 flex flex-col justify-between py-3 items-center ease-linear cursor-pointer shadow shadow-white/80' key={item.id}>
                            <h1 className='text-xl uppercase'>{item.title}</h1>
                            <div className='flex justify-between w-full px-5 items-center'>
                                <p className='text-xs'>{item.deadline}</p>
                                <span className='text-xs'><strong className='text-red-600 text-base'>{calculateDaysRemaining(item.deadline)}</strong> days remaining</span>
                            </div>
                        </div>
                    ) : <div className='w-64 space-y-2 bg-slate-950 rounded-2xl opacity-100 flex flex-col justify-between py-3 items-center ease-linear cursor-pointer shadow shadow-white/80' >
                        <h1 className='text-xl uppercase text-white'>No done Task </h1>
                    </div>}
                </div>
            </div>
        </div>
    )
}
