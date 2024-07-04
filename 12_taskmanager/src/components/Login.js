import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Link as RouterLink } from '@mui/material';
import authService from '../appwrite/auth';
import { useDispatch, } from 'react-redux';
import { login } from '../store/authSlice';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
    const dispatch = useDispatch()
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    // const [password, setPassword] = useState('');

    const submit = async (data) => {
        setError('')
        try {
            const session = authService.login(data)
            if (session) {
                const userAccount = await authService.getCurrentUser()
                if (userAccount) {
                    dispatch(login(userAccount))
                    navigate('/')
                }
            }
        }
        catch (error) {
            setError(error.message)
        };
    }
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
                        Login in your Account
                    </Typography>
                    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                    <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="Email"
                            // autoComplete="username"
                            // autoFocus
                            // value={input}
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^([\w\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address is not Valid"
                                }
                            })}
                        // onChange={(e) => setInput(e.target.value)}
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
                            // autoComplete="current-password"
                            // value={input}
                            {...register("password", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
                                        "Passwrd is not Valid. Use Characters for strong password"
                                }
                            })}
                        // onChange={(e) => setInput(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        <Typography variant="body2" align="center">
                            {"Don't have an account? "}
                            <RouterLink href="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
                                Sign Up
                            </RouterLink>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default LoginForm;
