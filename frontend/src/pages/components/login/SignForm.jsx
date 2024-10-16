import axios from 'axios'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export default function SignForm({ setIsLoggedIn }) {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [rPassword, setRPassword] = useState('')
    const [profile,setProfile] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (password == rPassword) {
            const formData = new FormData()
            formData.append('username', username)
            formData.append('password', password)
            formData.append('profile', profile)
            axios.post('http://localhost/task/controlers/signup.php', formData).then(res => {
                toast.success('اکانت با موفقیت ساخته شد')
                setTimeout(() => {
                    setIsLoggedIn(prev=>!prev)
                }, 1000);
        }).catch(err => console.error(err))
        }
        else {
            toast.error("رمز عبور مطابقت ندارد")
        }
        setIsLoading(false)
    }
    return (
        <>
            <Toaster  position="top-left"
                reverseOrder={false} />
            <a href="/" title="آزادی" className="flex items-center justify-center sm:justify-center">
                <img src="/logo.png" alt="logo" className='w-28 h-28' />
            </a>
            <div
                className="w-full px-0 pt-5 pb-6 mx-auto mt-4 mb-0 space-y-4 bg-transparent border-0 z-50 border-gray-200 rounded-lg bg-white md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 sm:mt-8 sm:mb-5  shadow-lg shadow-black/30"
            >
                <h1 className="mb-5 text-2xl  text-center text-green-600 sm:text-center capitalize font-bold">signup</h1>
                <form onSubmit={handleSubmit} className="pb-1 space-y-4  text-right px-5" encType="multipart/form-data">
                    <label className="block">
                        <span className="block mb-1 text-xs  text-gray-700 font-extrabold">username</span>
                        <input className='bg-slate-950 text-gray-200' onChange={(e) => setUserName(e.target.value)} type="text" placeholder="نام کاربری" required />
                    </label>
                    <label className="block">
                        <span className="block mb-1 text-xs  text-gray-700 font-extrabold">password</span>
                        <input className='bg-slate-950 text-gray-200' onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" required />
                    </label>
                    <label className="block">
                        <span className="block mb-1 text-xs  text-gray-700 font-extrabold">repeat password</span>
                        <input className='bg-slate-950 text-gray-200' onChange={(e) => setRPassword(e.target.value)} type="password" placeholder="••••••••" required />
                    </label>
                    <label className="block relative">
                        <span className="block mb-1 text-xs  text-gray-700 font-extrabold">profile</span>
                        <input className='bg-slate-950 text-gray-200' onChange={(e) => setProfile(e.target.files[0])} type="file" required />
                    </label>
                    <div className="flex  items-start justify-center sm:items-center sm:flex-row space-x-24">
                        {isLoading ? <h1>waiting...</h1> :
                            <>
                                <label className="flex items-center">
                                    <input type="checkbox" className="w-4" required />
                                    <span className="block ml-2 text-[8px]  lg:text-[10px]  text-gray-700 font-extrabold cursor-pointer">term & privacy</span>
                                </label>
                                <button type="submit" className="w-24 p-1 rounded-lg text-gray-100 bg-blue-600"  >signup</button>
                            </>}
                    </div>
                </form>
            </div>
            <p className="my-0 text-sm font-medium text-center text-gray-200 sm:my-5 tracking-wide pt-10 lg:pt-3 pb-2">
                <button onClick={() => setIsLoggedIn(prev => !prev)} className="text-purple-700 hover:text-purple-900 mr-1 text-sm">ورود</button>
                قبلا ثبت نام کردی؟
            </p>
            </>

        )
}
