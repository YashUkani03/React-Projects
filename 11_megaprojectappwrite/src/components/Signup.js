import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const [error, setError] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()


    const singup = async (data) => {
        setError("")
        try {
            const session = await authService.CreateUser(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message || 'Something went Wrong')
        }

    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={'w-full mx-auto max-w-lg bg-gray-100 rounded-lg p-10 border border-black/10'}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign up to create account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link to={"/login"}
                        className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center' >
                    {error}</p>}
                <form onSubmit={handleSubmit(singup)}>
                    <div className='spcae-y-5'>
                        <Input
                            label='Full Name:'
                            placeholder="Enter your Full Name"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input
                            label='Email'
                            placeholder='Enter your email address'
                            type='email'
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^([\w\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address is not Valid"
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type='password'
                            {...register('password', {
                                required: true
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full mt-4'>
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
