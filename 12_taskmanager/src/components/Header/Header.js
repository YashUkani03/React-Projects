import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
    // const navItems = [
    //     {
    //         name: "Login",
    //         slug: '/login'
    //     },
    //     {
    //         name: "Signup",
    //         slug: '/signup'
    //     }
    // ]
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="relative">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Task Manager
                    </Typography>
                    <Link href='/login' component='button'
                        >
                        <Button variant="contained" >Login</Button>
                    </Link>&nbsp; &nbsp;
                    <Link href='/signup' component='button'>
                        <Button variant="contained" >Signup</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
