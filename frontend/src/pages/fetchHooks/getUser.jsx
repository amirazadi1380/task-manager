import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'

export default function getUser() {
    const [user, setUser] = useState([])
    const token = Cookies.get('token');
    useEffect(() => {
        async function fetchUserInfo() {
            const formData = new FormData()
            formData.append('token', token);
            await axios.post('http://localhost/task/controlers/getUser.php', formData).then(res => setUser(res.data.data)).catch(err => console.error(err))
            console.log(user)
        }
        fetchUserInfo()
    }, [])
    return { user }

}
