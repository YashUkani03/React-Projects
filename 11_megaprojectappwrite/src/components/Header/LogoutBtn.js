import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/configure.js';
import { logout } from '../../store/authSlice.js'

function LogoutBtn() {
    const dispatch = useDispatch()
    const LogoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
            })
            .catch()
    }
    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full'>
            Logout
        </button>
    )
}

export default LogoutBtn
