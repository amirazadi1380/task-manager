import React, { useState } from 'react'
import SignForm from './SignForm'
import LogForm from './LogForm'

export default function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return (
      <>
            {isLoggedIn ? <LogForm setIsLoggedIn={setIsLoggedIn}/> : <SignForm setIsLoggedIn={setIsLoggedIn} />}
      </>
    )
}
