import React from 'react';
import { Button, Typography, Link } from '@mui/material';
import Header from './Header/Header';

function Home() {
    return (
        <Header>
            <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url()' }}>
                <Typography variant="h2" gutterBottom>
                    Welcome to the Task Manager
                </Typography>
                <Typography variant="h5" paragraph>
                    Manage your tasks efficiently and effectively.
                </Typography>
                <Link href="/login" style={{ textDecoration: 'none' }}>
                    <Button variant="contained">Go to Task List</Button>
                </Link>
            </div>
        </Header>
    );
}

export default Home;
