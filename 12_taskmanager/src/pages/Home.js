import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/configure';
import { Typography, Fab, Container, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import DataTable from '../components/DataTable';
import GridViewIcon from '@mui/icons-material/GridView';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const user = useSelector((state) => state.auth.userData);
    const [tasks, setTasks] = useState([0])
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {

            appwriteService.getTasks([])
                .then((task) => {
                    if (task) {
                        setTasks(task.documents)
                    }
                })
        }
    }, [user]);

    const ChangePage = () => {
        navigate("/columntable")
    }

    const handlelocation = () => { 
        navigate('/add-task')
    }
    return (
        <Container>
            {!user ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        backgroundImage: 'url(https://your-image-url.com)', // Replace with your background image URL
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <Typography variant="h2" gutterBottom>
                        Welcome to the Task Manager
                    </Typography>
                    <Typography variant="h5" paragraph>
                        Manage your tasks efficiently and effectively.
                    </Typography>


                </Box>
            ) : (
                <div><br />
                    <Typography variant="h4" component="h1" gutterBottom >
                        Your Tasks
                        <Button style={{ marginLeft: 920 , color: 'black' }}
                            onClick={ChangePage}
                        >
                            <GridViewIcon />
                        </Button>
                    </Typography>

                    {tasks?.length === 0 ? (
                        <div className='flex  py-200 justify-center items-center align-center h-full' >
                            <Typography variant="body1" align='center'>
                                No tasks available. Please add some tasks.
                            </Typography>
                        </div>
                    ) : (
                        <DataTable />
                    )}
                    <Link>
                        <Fab
                            onClick={handlelocation}
                            color="primary"
                            aria-label="add"
                            style={{
                                position: 'fixed',
                                bottom: '130px',
                                right: '80px',
                            }}
                        >
                            <AddIcon />
                        </Fab>
                    </Link>
                </div>
            )}
        </Container>
    );
};

export default HomePage;
