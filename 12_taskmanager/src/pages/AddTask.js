// AddTaskForm.js
import React from 'react';
import { Button, Link, TextField } from '@mui/material';
import appwriteService from '../appwrite/configure';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const AddTask = (tasks) => {
    // const [task, setTask] = useState(tasks.tasks)
    const navigate = useNavigate()
    // const location = useLocation()
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: tasks?.title || '',
            startDate: tasks?.startDate || '',
            dueDate: tasks?.dueDate || '',
            status: tasks?.status || '',
        }
    })


    const create = async (data) => {
        console.log(data);
        if (data) {
            const userTask = await appwriteService.createTask(data)
            console.log(userTask);
            navigate( -1);
        }
        // Handle form submission logic here
    };



    return (
        <div className="container mx-auto mt-8 mb-80">
            <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
            <form onSubmit={handleSubmit(create)} className="max-w-lg mx-auto">
                <TextField
                    label="Task"
                    variant="outlined"
                    fullWidth
                    id='title'
                    margin="normal"
                    name="title"
                    required
                    {...register('title', {
                        required: true,
                    })}
                />
                <TextField
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="startDate"
                    {...register('startDate', {
                        required: true
                    }
                    )}
                    value={tasks.dueDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
                <TextField
                    label="Due Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="dueDate"
                    {...register('dueDate', {
                        required: true
                    }
                    )}
                    // value={tasks.dueDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
                <br />
                <Link>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        className="mt-4"
                    >
                        Add Task
                    </Button>
                </Link>
            </form>
        </div>
    );
};

export default AddTask;
