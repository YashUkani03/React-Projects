import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import appwriteService from '../appwrite/configure';
import { Container, Typography, Button, IconButton } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useNavigate, Link } from 'react-router-dom';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';

const formatdate = (date) => {
    return new Date(date).toLocaleDateString();
};

const ColumnTable = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = React.useState({
        Scheduled: [],
        inProgress: [],
        completed: []
    });
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
                    InProgress: updatedTasks.filter(task => task.status === 'In-progress'),
                    completed: updatedTasks.filter(task => task.status === 'Completed'),
                };

                setTasks(organizedTasks);
            } catch (error) {
                console.log("Error", error);
            }
        };
        fetchTasks();
    }, [setTasks]);

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
                                    className="bg-gray-200 p-4 w-1/3 rounded"
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
                                    <Button
                                    variant='outlined'
                                    style={{color:'darkslategray',
                                        borderColor: 'darkslategray',
                                        
                                    }}
                                    >
                                        <AddBoxIcon />
                                    </Button>
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
