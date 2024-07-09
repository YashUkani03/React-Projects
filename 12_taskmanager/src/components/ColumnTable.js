import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/configure';
import { Container, IconButton } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, Link } from 'react-router-dom'
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

const formatdate = (date) => {
    return new Date(date).toLocaleDateString()
}

const ColumnTable = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = React.useState({
        Scheduled: [],
        inProgress: [],
        completed: []
    });
    // const user = useSelector((state) => state.auth.userData)
    // useEffect(() => {
    //     if (user) {
    //         appwriteService.getTasks([])
    //             .then((task) => {
    //                 setTasks(task)
    //             })
    //     }
    //     else {
    //         return <div>No tasks</div>
    //     }
    // }, [user, setTasks])

    const onDragEnd = (result) => {
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

            setTasks((prev) => ({
                ...prev,
                [source.droppableId]: sourceItems,
                [destination.droppableId]: destinationItems,
            }));
        }
    }
    // console.log(tasks);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await appwriteService.getTasks();
                const updatedTasks = data.map((task) => ({
                    ...task,
                    status: StatusGenerator(task.startDate, task.dueDate),
                    startDate: formatdate(task.startDate),
                    dueDate: formatdate(task.dueDate)

                }))

                const organizedTasks = {
                    Scheduled: updatedTasks.filter(task => task.status === 'Scheduled'),
                    inProgress: updatedTasks.filter(task => task.status === 'In-progress'),
                    completed: updatedTasks.filter(task => task.status === 'Completed'),
                };

                setTasks(organizedTasks);

            } catch (error) {
                console.log("Error", error);
            }
        }
        fetchTasks()
    }, [setTasks])


    const ChangePage = () => {
        navigate('/')
    }

    const handlelocation = () => {
        navigate('/add-task');
    };

    const handleDelete = async ($id, columnId) => {
        try {
            if ($id) {
                await appwriteService.deleteTask($id);
            }

            setTasks((prev) => ({
                ...prev,
                [columnId]: prev[columnId].filter(task => task.$id !== $id)
            }));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }
    return (
        <Container>
            <div><br />
                <Typography variant="h4" component="h1" gutterBottom >
                    Your Tasks
                    <Button style={{ marginLeft: 920 }}
                        onClick={ChangePage}
                    >
                        <TableRowsIcon />
                    </Button>
                </Typography>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex space-x-4 p-4">
                    {Object.entries(tasks).map(([columnId, tasks]) => (
                        <Droppable droppableId={columnId} key={columnId} >
                            {(provided) => (
                                <div
                                    className="bg-gray-200 p-4 w-1/3 rounded"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <h2 className="text-lg font-semibold capitalize mb-4 text-center">{columnId}</h2>
                                    {tasks.map((task, index) => (
                                        <Draggable key={task.$id} draggableId={task.$id} index={index}>
                                            {(provided) => (
                                                <div
                                                    className="bg-white p-2 mb-2 rounded shadow flex justify-between items-center"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {task.title}
                                                    <span>
                                                        <IconButton style={{ color: 'gray' }}
                                                            onClick={() => handleDelete(task.$id, columnId)}
                                                            disabled={task.isDeleting}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </span>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
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
        </Container>
    );
};

export default ColumnTable;
