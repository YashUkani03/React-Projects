import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import appwriteService from '../appwrite/configure';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
// import { useDispatch } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'title', headerName: 'Title', width: 550 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    { field: 'dueDate', headerName: 'Due Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        width: 100,
        renderCell: (task) => (
            <IconButton
                onClick={() => { task.row.onDelete(task.row.$id) }}
                aria-label="delete"
                disabled={task.row.isDeleting}
            >
                <DeleteIcon />
            </IconButton>
        ),
    },

];

const localText = {
    noRowsLabel: "No Tasks"
}

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
    reorder.splice(endIndex, 0, removed)

    console.log(result);
    return result
}

const getlisttask = (isDragging) => ({
    background: isDragging ? 'lightblue' : '',
    padding: 2,
    height: 620, width: '100%'
})

const DataTable = () => {
    // const dispatch = useDispatch();
    const [tasks, setTasks] = useState([])
    const onDragEnd = (result) => {
        const { source , destination} = result
        if (!result.destination) {
            return;
        }

        const reordedRow = reorder(tasks, source.index, destination.index)
        console.log(reordedRow)
        setTasks(reordedRow)
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const documents = await appwriteService.getTasks();
                const updateTasks = await documents.map((task) => ({
                    ...task,
                    status: StatusGenerator(task.startDate, task.dueDate)
                }))
                // const response = await documents.map((task, index) => ({ id: task.$id, title: task.title, index }))
                // console.log(response);
                const handleDelete = async (id) => {
                    if (id) {
                        setTasks(tasks.map(task => ({
                            ...task,
                            isDeleting: task.id === id ? true : task.isDeleting
                        })));
                        await appwriteService.deleteTask(id)
                    }
                }
                // Transform documents into rows compatible with DataGrid
                const formattedRows = updateTasks?.map((doc, index) => ({
                    id: index + 1,
                    title: doc.title,
                    startDate: doc.startDate,
                    dueDate: doc.dueDate,
                    status: doc.status,
                    $id: doc.$id,
                    onDelete: handleDelete,
                }));


                setTasks(formattedRows);
                // setRows(response)

            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();

    }, [setTasks,]);


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='tasks'>
                {(provided, snapshot) => (
                    <div style={getlisttask(snapshot.isDragging)} {...provided.droppableProps} ref={provided.innerRef}>
                           
                    </div>
                )}
            </Droppable>
        </DragDropContext >
        // </div>
    );
}

export default DataTable;
