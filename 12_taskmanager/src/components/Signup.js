// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { login } from '../store/authSlice'

// function Signup() {

//     const { register, handleSubmit } = useForm()
//     const dispatch = useDispatch()
//     const singup = () => {
//         console.log("hello");
//         dispatch(login())
//     }
//     return (
//         <div className='flex items-center justify-center w-full'>
//             <div className={'w-full mx-auto max-w-lg bg-gray-100 rounded-lg p-10 border border-black/10'}>
//                 <div className='mb-2 flex justify-center'>
//                     <span className='inline-block w-full max-w-[100px]'>
//                     </span>
//                 </div>
//                 <h2 className='text-center text-2xl font-bold leading-tight'>
//                     Sign up to create account
//                 </h2>
//                 <p className='mt-2 text-center text-base text-black/60'>
//                     Already have an account?&nbsp;
//                     <Link to={"/login"}
//                         className='font-medium text-primary transition-all duration-200 hover:underline'>
//                         Sign Up
//                     </Link>
//                 </p>
//                 {error && <p className='text-red-600 mt-8 text-center' >
//                     {error}</p>}
//                 <form onSubmit={handleSubmit(singup)}>
//                     <div className='spcae-y-5'>
//                         <Input
//                             label='Full Name:'
//                             placeholder="Enter your Full Name"
//                             {...register("name", {
//                                 required: true
//                             })}
//                         />
//                         <Input
//                             label='Email'
//                             placeholder='Enter your email address'
//                             type='email'
//                             {...register("email", {
//                                 required: true,
//                                 validate: {
//                                     matchPatern: (value) => /^([\w\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address is not Valid"
//                                 }
//                             })}
//                         />
//                         <Input
//                             label="Password"
//                             placeholder="Enter your password"
//                             type='password'
//                             {...register('password', {
//                                 required: true
//                             })}
//                         />
//                         <Button
//                             type='submit'
//                             className='w-full mt-4'>
//                             Create Account
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Signup


import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Link as RouterLink } from '@mui/material';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Box
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)', // Replace with your image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container component="main" maxWidth="xs" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2, padding: 2 }}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="current-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Typography variant="body2" align="center">
                            {"Already have an account? "}
                            <RouterLink href="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                                Login
                            </RouterLink>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Signup;
