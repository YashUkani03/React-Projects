import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import appwriteService from '../appwrite/configure';
import { Container, Typography, Button, IconButton } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useNavigate, Link } from 'react-router-dom';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear';

const formatdate = (date) => {
    return new Date(date).toLocaleDateString();
};

const ColumnTable = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = React.useState({
        Scheduled: [],
        InProgress: [],
        Completed: []
    });

    const [newtask, setNewTask] = useState('')
    const [showForm, setShowForm] = useState({
        Scheduled: false,
        InProgress: false,
        Completed: false
    });

    const handleAddTask = async (columnId) => {
        try {
            const task = {
                title: newtask,
                startDate: new Date().toLocaleString(),  // Set current date as start date
                dueDate: new Date().toLocaleString(),  // Set current date as due date
                status: columnId
            };
            const createdTask = await appwriteService.createTask(task);
            console.log('Created Task:', createdTask);  // Log the created task
            setTasks((prevTasks) => ({
                ...prevTasks,
                [columnId]: [...prevTasks[columnId], { ...createdTask, title: newtask, startDate: formatdate(createdTask.startDate), dueDate: formatdate(createdTask.dueDate) }],
            }));
            localStorage.setItem('coltask', JSON.stringify(createdTask))


            setNewTask('');
            setShowForm((prev) => ({
                ...prev,
                [columnId]: false
            }));
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const toggleForm = (columnId) => {
        setShowForm((prev) => ({
            ...prev,
            [columnId]: !prev[columnId]
        }));
    };


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await appwriteService.getTasks();
                const updatedTasks = data.map((task) => ({
                    ...task,
                    startDate: formatdate(task.startDate),
                    dueDate: formatdate(task.dueDate)
                }));

                const organizedTasks = {
                    Scheduled: updatedTasks.filter(task => task.status === 'Scheduled'),
                    InProgress: updatedTasks.filter(task => task.status === 'InProgress'),
                    Completed: updatedTasks.filter(task => task.status === 'Completed'),
                };

                setTasks(organizedTasks);
                localStorage.setItem('coltask', JSON.stringify(organizedTasks))
            } catch (error) {
                console.log("Error", error);
            }
        };
        const storedTasks = localStorage.getItem('coltask');
        try {
            setTasks(JSON.parse(storedTasks));
        } catch (error) {
            console.error("Error parsing tasks from localStorage:", error);
            // Handle error parsing tasks from localStorage
        }
        fetchTasks();
    }, [setTasks]);

    // useEffect(()=>{
    //     const task = localStorage.getItem('coltask')
    //     setTasks(JSON.parse(task))
    // },[tasks , setTasks])

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId) {
            const columnTasks = Array.from(tasks[source.droppableId]);
            const [reorderedItem] = columnTasks.splice(source.index, 1);
            columnTasks.splice(destination.index, 0, reorderedItem);

            setTasks((prev) => ({
                ...prev,
                [source.droppableId]: columnTasks,
            }));
        } else {
            const sourceItems = Array.from(tasks[source.droppableId]);
            const destinationItems = Array.from(tasks[destination.droppableId]);
            const [movedItem] = sourceItems.splice(source.index, 1);
            destinationItems.splice(destination.index, 0, movedItem);

            // Update the status in the moved task
            movedItem.status = destination.droppableId;

            setTasks((prev) => ({
                ...prev,
                [source.droppableId]: sourceItems,
                [destination.droppableId]: destinationItems,
            }));

            // Update the status in the backend
            try {
                await appwriteService.updateTasks(movedItem.$id, {
                    startDate: movedItem.startDate,
                    dueDate: movedItem.dueDate,
                    status: destination.droppableId,
                });
                console.log(`Task ${movedItem.$id} status updated to ${destination.droppableId}`);
            } catch (error) {
                console.error("Error updating task status:", error);
            }
        }
    };



    const ChangePage = () => {
        navigate('/');
    };

    const handleDelete = async (taskId, columnId) => {
        try {
            await appwriteService.deleteTask(taskId);
            setTasks((prevTasks) => ({
                ...prevTasks,
                [columnId]: prevTasks[columnId].filter(task => task.$id !== taskId)
            }));
        } catch (error) {
            console.log("Error deleting task:", error);
        }
    };

    return (
        <Container>
            <div><br />
                <Typography variant="h4" component="h1" gutterBottom >
                    Your Tasks
                    <Button style={{ marginLeft: 920 }} onClick={ChangePage}>
                        <TableRowsIcon />
                    </Button>
                </Typography>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex space-x-4 p-4">
                    {Object.entries(tasks).map(([columnId, columnTasks]) => (
                        <Droppable droppableId={columnId} key={columnId}>
                            {(provided) => (
                                <div
                                    className="bg-gray-400 p-4 w-1/3 rounded"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <h2 className="text-lg font-semibold capitalize mb-4 text-center">{columnId}</h2>
                                    {columnTasks.map((task, index) => (
                                        <Draggable key={task.$id} draggableId={task.$id} index={index}>
                                            {(provided) => (
                                                <div
                                                    className="bg-white p-2 mb-2 rounded shadow flex justify-between items-center"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <div>{task.title}</div>
                                                    <IconButton onClick={() => handleDelete(task.$id, columnId)} aria-label="delete">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    {showForm[columnId] ? (
                                        <div className="mt-4">
                                            <TextField
                                                label="Task Title"
                                                fullWidth
                                                value={newtask}
                                                onChange={(e) => setNewTask(e.target.value)}
                                                margin="dense"
                                            />
                                            <Button
                                                onClick={() => handleAddTask(columnId)}
                                                variant="contained"
                                                color="success"
                                                style={{ marginTop: '10px' }}
                                            >
                                                <CheckIcon />
                                            </Button>
                                            <Button
                                                onClick={() => toggleForm(columnId)}
                                                variant="contained"
                                                color="error"
                                                style={{ marginTop: '10px', marginLeft: '10px' }}
                                            >
                                                <ClearIcon />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            style={{ color: 'darkslategray' }}
                                            onClick={() => toggleForm(columnId)}
                                        >
                                            <AddBoxIcon />
                                        </Button>
                                    )}

                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
            <Link to='/add-task'>
                <Fab
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
        </Container>
    );
};

export default ColumnTable;
