import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Task Manager
                    </Typography>
                    <Link to='/login' component='button'>
                        <Button variant="contained" >Login</Button>
                    </Link>&nbsp; &nbsp;
                    <Link to='/signup' component='button'>
                        <Button variant="contained" >Signup</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );



    
}
