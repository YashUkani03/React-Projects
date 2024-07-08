import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/configure';
import DeleteIcon from '@mui/icons-material/Delete'
import DehazeIcon from '@mui/icons-material/Dehaze';
import {Typography} from '@mui/material';
import { Table, TableCell, TableBody, TableHead, TableRow, TableContainer, Paper, Button } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

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

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

const DataTable = () => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const documents = await appwriteService.getTasks();
                const updatedTasks = documents.map((task) => ({
                    ...task,
                    status: StatusGenerator(task.startDate, task.dueDate)
                }))
                setTasks(updatedTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            // Optimistically update UI to mark task as deleting
            setTasks(tasks.map(task =>
                task.$id === id ? { ...task, isDeleting: true } : task
            ));

            // Delete task from database
            await appwriteService.deleteTask(id);

            // Update state to remove task from UI
            setTasks(tasks.filter(task => task.$id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
            // Rollback UI changes if deletion fails
            setTasks(tasks.map(task =>
                task.$id === id ? { ...task, isDeleting: false } : task
            ));
        }
    };

    const onDragEnd = (result) => {
        const { source, destination } = result
        if (!result.destination) {
            return;
        }

        const reorderedTasks = reorder(tasks, source.index, destination.index)
        setTasks(reorderedTasks)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <TableContainer component={Paper} {...provided.droppableProps} ref={provided.innerRef}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={10}></TableCell>
                                    <TableCell width={600}>Title</TableCell>
                                    <TableCell width={150}>Start Date</TableCell>
                                    <TableCell width={150}>Due Date</TableCell>
                                    <TableCell width={130}>Status</TableCell>
                                    <TableCell width={30}></TableCell>
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
                                                    <TableCell>{task.title}</TableCell>
                                                    <TableCell>{task.startDate}</TableCell>
                                                    <TableCell>{task.dueDate}</TableCell>
                                                    <TableCell>{task.status}</TableCell>
                                                    <TableCell>
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
    )

};

export default DataTable;
