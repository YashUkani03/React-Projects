import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function AuthLayout({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if (authStatus && authStatus !== authentication) {
            navigate('/')
        } else if (!authStatus && authStatus !== authentication) {
            navigate('/login')
        }
        setLoader(false)
    }, [navigate, authStatus, authentication])

    return loader ? <h1>Loading....</h1> : <>{children}</>
}

