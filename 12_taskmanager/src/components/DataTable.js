import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/configure';
import DeleteIcon from '@mui/icons-material/Delete';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import { Table, TableCell, TableBody, TableHead, TableRow, TableContainer, Paper, Button } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const formatdate = (date) => {
    return new Date(date).toDateString()
}

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

const DataTable = () => {
    const [tasks, setTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const documents = await appwriteService.getTasks();
                const updatedTasks = documents.map((task) => ({
                    ...task,
                    startDate: formatdate(task.startDate),
                    dueDate: formatdate(task.dueDate)
                }));
                setTasks(updatedTasks);
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []); // Empty dependency array, runs once on mount

    useEffect(() => {
        // Load tasks from localStorage on component mount
        const tasksFromStorage = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(tasksFromStorage);
    }, []); // Empty dependency array, runs once on mount

    const handleDelete = async (id) => {
        try {
            setTasks(tasks.map(task =>
                task.$id === id ? { ...task, isDeleting: true } : task
            ));

            await appwriteService.deleteTask(id);

            setTasks(tasks.filter(task => task.$id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
            setTasks(tasks.map(task =>
                task.$id === id ? { ...task, isDeleting: false } : task
            ));
        }
    };

    const handleEdit = (id) => {
        setEditTaskId(id);
    };

    const handleSave = async (editedTask) => {
        try {
            const updatedTasks = tasks.map(task =>
                task.$id === editedTask.$id ? editedTask : task
            );

            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

            await appwriteService.updateTasks(editedTask.$id, editedTask)
            setEditTaskId(null); // Exit edit mode
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        const reorderedTasks = reorder(tasks, source.index, destination.index);
        setTasks(reorderedTasks);
        localStorage.setItem('tasks', JSON.stringify(reorderedTasks));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <TableContainer component={Paper} style={{ backgroundColor: 'whitesmoke' }} {...provided.droppableProps} ref={provided.innerRef}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <>
                                        <TableCell width={10}></TableCell>
                                        <TableCell width={500} ><strong>Title</strong></TableCell>
                                        <TableCell width={150} style={{ textAlign: 'center' }}><strong>Start Date</strong></TableCell>
                                        <TableCell width={150} style={{ textAlign: 'center' }}><strong>Due Date</strong></TableCell>
                                        <TableCell width={100} style={{ textAlign: 'center' }}><strong>Status</strong></TableCell>
                                        <TableCell ></TableCell>
                                    </>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Typography variant="subtitle1" align="center">
                                                No tasks
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    tasks.map((task, index) => (
                                        <Draggable key={task.$id} draggableId={task.$id} index={index}>
                                            {(provided, snapshot) => (
                                                <TableRow
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        background: snapshot.isDragging ? 'lightblue' : ''
                                                    }}
                                                >
                                                    <TableCell>
                                                        <DehazeIcon />
                                                    </TableCell>
                                                    <TableCell>
                                                        {editTaskId === task.$id ? (
                                                            <TextField
                                                                autoFocus
                                                                value={task.title}
                                                                onChange={(e) => setTasks(tasks.map(t =>
                                                                    t.$id === task.$id ? { ...t, title: e.target.value } : t
                                                                ))}
                                                            />
                                                        ) : (
                                                            task.title
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{task.startDate}</TableCell>
                                                    <TableCell>{task.dueDate}</TableCell>
                                                    <TableCell>{task.status}</TableCell>
                                                    <TableCell>
                                                        {editTaskId === task.$id ? (
                                                            <Button
                                                                onClick={() => handleSave(task)}
                                                                style={{ color: 'green' }}
                                                            >
                                                                <SaveIcon />
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                onClick={() => handleEdit(task.$id)}
                                                                style={{ color: 'grey' }}
                                                            >
                                                                <EditIcon />
                                                            </Button>
                                                        )}
                                                        <Button
                                                            style={{ color: 'grey' }}
                                                            onClick={() => handleDelete(task.$id)}
                                                            disabled={task.isDeleting}
                                                        >
                                                            <DeleteIcon />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </Draggable>
                                    ))
                                )}
                                {provided.placeholder}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DataTable;
