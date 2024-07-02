import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Link as RouterLink } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom'
import config from '../config/config';


function Signup() {
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const singup = async (data) => {
        setError('')
        try {
            console.log(config.appwriteURL);
            console.log(config.appwriteProjectID);
            const session = await authService.CreateUser(data)
            if (session) {

                const userAccount = await authService.getCurrentUser()
                if (userAccount) {
                    dispatch(login(userAccount))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message || 'something went Wrong')
        }
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
                    {error && <p className='text-red-600 mt-8 text-center' >
                        {error}</p>}
                    <Box component="form" onSubmit={handleSubmit(singup)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^([\w\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address is not Valid"
                                }
                            })}
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
                            {...register("password", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
                                        "Passwrd is not Valid. Use Characters for strong password"
                                }
                            })}
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
                            {...register("password", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
                                        "Passwrd is not Valid. Use Characters for strong password"
                                }
                            })}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Account
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
