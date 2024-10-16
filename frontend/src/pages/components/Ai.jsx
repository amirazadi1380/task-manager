import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoIosFlash } from "react-icons/io";
import Loader from './Loader';

export default function Ai() {
    const [text, setText] = useState('');
    const [savedText,setSavedText] = useState('')
    const [result, setResult] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await axios.post('https://api.one-api.ir/chatbot/v1/gpt3.5-turbo/', [{
            "role": "user",
            "content": text
        }], {
            headers: {
                "one-api-token": "404454:66786341036e7",
                "Content-Type": "application/json"
            }
        }).then(res => setResult(res.data.result)).catch(err => console.error(err))
        setSavedText(text)
        setText('')
        setIsLoading(false)
    }



        return (
        <div className=' relative rounded-3xl py-36'>
            <div className='py-5 px-10 w-full h-96 '>
                {result ? <div className='flex flex-col space-y-10'>
                    <div className='w-full  flex justify-end'>
                        <div className='bg-indigo-700 py-4 rounded-l-3xl rounded-tr-3xl px-5 tracking-wide text-gray-300'>
                            <p>{savedText}</p>
                        </div>
                    </div>
                    <div className='w-full flex justify-start'>
                        <div className='bg-gray-700 py-4 rounded-r-3xl rounded-tl-3xl px-5 tracking-wide text-gray-300'>
                            <p className='text-xs tracking-wide lg:text-sm'>{result}</p>
                        </div>
                    </div>
                </div> :
                    <div>
                        <div className='w-full flex flex-col justify-end mx-auto px-10 lg:px-64 py-10'>
                            <div className='bg-gray-900 py-4 rounded-3xl  tracking-wide text-gray-300 '>
                                <p className='text-xs lg:text-lg text-center'> how can i help you?</p>
                            </div>
                            <p className='text-gray-700 text-center text-sm mt-2'>chat GPT 3.5 free</p>
                        </div>

                    </div>
                }
            </div>

            <div className=' absolute bottom-0 w-full '>
                <form className='py-0  max-w-2xl mx-auto mb-5' onSubmit={handleSubmit}>
                    <label className='relative'>
                        <input className='text-gray-200 text-left bg-gray-700 border border-white py-7 tracking-wide rounded-full placeholder:pl-2' placeholder='how can i help you?' onChange={(e) => setText(e.target.value)} type="text" value={text} />
                        <button type='submit'>
                            <IoIosFlash className='bg-indigo-700 text-gray-100 p-2  cursor-pointer w-10 h-10 rounded-full absolute -top-[10px] right-5 hover:bg-gray-800  hover:duration-150 ease-linear' />
                        </button>
                    </label>
                </form>
            </div>
        </div>
        )
}
