import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function LogForm({setIsLoggedIn}) {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <div className="px-4 py-20 mx-auto max-w-7xl">
      <Toaster/>
      <a href="/" title="amir azadi" className="flex items-center justify-center sm:justify-center">
        <img src="/logo.png" alt="logo" className='w-28 h-28' />
      </a>
      <div
        className="w-full px-0 pt-5 pb-6 mx-auto mt-4 mb-0 space-y-4 bg-transparent border-0 border-gray-200 rounded-lg bg-white md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 sm:mt-8 sm:mb-5  shadow-lg shadow-black/30"
      >
        <h1 className="mb-10 text-2xl font-bold text-center text-green-600 sm:text-center">login</h1>
        <form onSubmit={(e) => {
          e.preventDefault()

          const formData = new FormData()
          formData.append('username', username)
          formData.append('password', password)
          axios.post('http://localhost/task/controlers/login.php', formData).then(res => {
            Cookies.set('token', res.data.token, { expires: 7 })
            toast.success('شما با موفقیت وارد شدید')
            setTimeout(() => {
              location.reload()
            }, 500);
          }).catch(err => console.error(err))

        }} className="pb-1 space-y-4  text-center justify-center flex flex-col items-center px-5">
          <label className="block">
            <span className="block mb-1 text-xs font-extrabold text-gray-700">username</span>
            <input className='bg-slate-950 text-gray-200' onChange={(e) => setUserName(e.target.value)} type="text" placeholder="نام کاربری" required />
          </label>
          <label className="block">
            <span className="block mb-1 text-xs font-extrabold text-gray-700">password</span>
            <input className='bg-slate-950 text-gray-200' onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" required />
          </label>

          <div className="flex  items-start justify-between sm:items-center sm:flex-row">
            <button type="submit" className="w-24 p-1 rounded-lg text-gray-100 bg-blue-600"  >login</button>
          </div>
        </form>
      </div>
      <p className="my-0 text-sm font-medium text-center text-gray-200 sm:my-5 tracking-wide pt-10 lg:pt-3 ">
        <button onClick={() => setIsLoggedIn(prev=>!prev)} className="text-purple-700 hover:text-purple-900 mr-1 text-sm">signup</button>
        اکانت نداری؟            </p>
    </div>
  )
}
