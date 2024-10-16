import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdOutlineCreate } from "react-icons/md";

export default function CreateTask() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState()
    const [source, setSource] = useState()
    const [userID, setUserID] = useState()
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function fetchUsers() {
            await axios.get('http://localhost/task/controlers/getAllUsers.php').then(res => setUsers(res.data.data))

        }
        fetchUsers()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('deadline', deadline)
        formData.append('source', source)
        formData.append('userID', userID)
        await axios.post('http://localhost/task/controlers/createTask.php', formData).then(res => console.log(res.data)).catch(err => console.error(err))
    }

    return (

        <div className="px-4 py-5 mx-auto max-w-7xl ">
            <div className='py-8 px-5 flex justify-between'>
                <h1 className='text-5xl text-gray-300 '>Create New Task</h1>
                <MdOutlineCreate className='w-10 h-10 text-gray-300' />
            </div>

            <div
                className="w-full relative px-0 pt-5 pb-6 mx-auto mt-4 mb-0 space-y-4  rounded-lg  max-w-2xl md:px-6 sm:mt-8 sm:mb-5  shadow-lg shadow-black/30"
            >
                <img src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fHR5cGV8ZW58MHx8MHx8fDA%3D" alt="pfp" className='absolute left-0 top-0 object-cover w-full h-full brightness-50 z-0 rounded-xl opacity-50' />
                <form onSubmit={handleSubmit} className="pb-1 space-y-8  text-center justify-center flex flex-col items-center px-5 z-50">
                    <label className="block z-20">
                        <span className="block mb-1  lg:text-base tracking-wide font-extrabold text-gray-200">Task Name</span>
                        <input className='text-left  lg:text-base tracking-wide w-52 bg-slate-950 text-gray-200' onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Task..." required />
                    </label>
                    <label className="block z-20">
                        <span className="block mb-1  lg:text-base tracking-wide font-extrabold text-gray-200">Description</span>
                        <textarea className='border text-left  lg:text-base tracking-wide w-64 lg:w-72 p-2 h-28 bg-slate-950 text-gray-200' onChange={(e) => setDescription(e.target.value)} type="text" placeholder='write a task' ></textarea>
                    </label>
                    <label className="block relative z-20">
                        <span className="block mb-1  lg:text-base tracking-wide  text-gray-200 font-extrabold">source</span>
                        <input className='bg-slate-950 text-gray-200 w-60 text-sm pt-2' onChange={(e) => setSource(e.target.files[0])} type="file" required />
                    </label>
                    <label className="block relative z-20">
                        <span className="block mb-1  lg:text-base tracking-wide  text-gray-200 font-extrabold">deadline</span>
                        <input className=' text-gray-800 w-64 text-center text-sm pt-2 ' onChange={(e) => setDeadline(e.target.value)} type="date" />
                    </label>
                    <label className="block z-20 ">
                        <span className="block mb-1  lg:text-base tracking-wide font-extrabold text-gray-200">Users</span>
                        <select onChange={(e) => setUserID(e.target.value)} className='border cursor-pointer bg-slate-950 text-gray-200 px-6 py-2  lg:text-base tracking-wide'>
                            <option>select a user</option>
                            {users.map(item => <option value={item.id} key={item.id}>{item.username}</option>)}
                        </select>
                    </label>

                    <div className="flex  items-start justify-between sm:items-center sm:flex-row z-20">
                        <button type="submit" className=" lg:text-base tracking-wide p-3 rounded-lg text-gray-100 bg-blue-700"  >Create Task</button>
                    </div>
                </form>
            </div>

        </div>)
}
