import React, { useEffect, useRef } from 'react';
import { MdOutlineLogout, MdOutlineDoneAll } from 'react-icons/md';
import { IoMdAdd } from "react-icons/io";
import { PiUsersThree } from "react-icons/pi";
import { BsListTask } from "react-icons/bs";
import { CiSettings, CiCalendar } from "react-icons/ci";

export default function Sidebar({ isOpen, setItems, user, setIsOpen }) {
    const sidebarRef = useRef(null); // Ref برای Sidebar

    useEffect(() => {
        // تابع برای بررسی کلیک خارج از Sidebar
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false); 
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarRef, setIsOpen]);

    return (
        <div
            ref={sidebarRef} // اتصال ref به Sidebar
            className={` ${isOpen ? 'w-64 duration-200 ease-linear opacity-100 absolute z-30 border' : 'w-0 opacity-0 duration-150 ease-linear'} 
            absolute lg:static lg:w-64 lg:opacity-100 lg:flex flex-col  h-screen px-5 py-16 lg:py-8 overflow-y-hiddne bg-slate-950 rounded-r-2xl shadow-white/20 shadow-lg`}
        >
            <div className='w-14 rounded-full h-14  bg-white'>
                <img className="w-full h-full rounded-full object-contain " src={user ? user.img_src : "https://pixsector.com/cache/50fcb576/av0cc3f7b41cb8510e35c.png"} alt="pfp" />
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">task</label>

                        <button onClick={() => setItems(1)} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <BsListTask className='w-5 h-5' />
                            <span className="mx-2 text-sm font-medium">My task</span>
                        </button>

                        <button onClick={() => setItems(2)} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <MdOutlineDoneAll />
                            <span className="mx-2 text-sm font-medium">Tasks</span>
                        </button>
                    </div>

                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">content</label>

                        <button onClick={() => setItems(3)} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <PiUsersThree className='w-5 h-5' />
                            <span className="mx-2 text-sm font-medium">Users</span>
                        </button>

                        <button onClick={() => setItems(4)} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <IoMdAdd className='w-5 h-5' />
                            <span className="mx-2 text-sm font-medium">Create A Task</span>
                        </button>

                        <button onClick={() => setItems(5)} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <CiCalendar className='w-5 h-5' />
                            <span className="mx-2 text-sm font-medium">Calendar</span>
                        </button>
                    </div>

                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Customization</label>

                        <button onClick={() => setItems(7)} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <CiSettings className='w-5 h-5' />
                            <span className="mx-2 text-sm font-medium">Ai assitnat</span>
                        </button>
                        <button onClick={() => setItems(6)} className="flex items-center px-3 py-2 text-red-500 transition-colors duration-300 transform rounded-lg  hover:text-gray-700">
                            <MdOutlineLogout className='w-5 h-5' />
                            <span className="mx-2 text-sm font-medium">Login / signup</span>
                        </button>

                    </div>
                </nav>
            </div>
        </div>
    );
}
