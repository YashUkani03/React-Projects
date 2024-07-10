// AddTaskForm.js
import React from 'react';
import { Button, Link, TextField } from '@mui/material';
import appwriteService from '../appwrite/configure';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';

const AddTask = (tasks) => {
    // const [task, setTask] = useState(tasks.tasks)
    const navigate = useNavigate()
    // const location = useLocation()
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            title: tasks?.title || '',
            startDate: tasks?.startDate || '',
            dueDate: tasks?.dueDate || '',
            status: tasks?.status || '',
        }
    })
    const StatusGenerator = (startDate, dueDate) => {
        const today = new Date().setHours(0, 0, 0, 0)
        const start = new Date(startDate).setHours(0, 0, 0, 0)
        const end = new Date(dueDate).setHours(0, 0, 0, 0)
        if (today < start) {
            return 'Scheduled'
        } else if (today >= start && today <= end) {
            return 'In-progress'
        }
        else {
            return 'Completed'
        }
    }

    const create = async (data) => {
        if (data) {
            const { startDate, dueDate } = data;
            const status = StatusGenerator(startDate , dueDate)
            const task = {...data , status : status}
            console.log(task);
            if (task) {
                await appwriteService.createTask(task)
                navigate(-1);
            }
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
                <FormControl fullWidth margin="normal">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                labelId="status-label"
                                id="status"
                                label="Status"
                                {...field}
                            >
                                <MenuItem value="Scheduled">Scheduled</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>
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
