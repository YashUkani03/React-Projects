import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import appwriteService from '../appwrite/configure';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux';
// import { removeTask } from '../store/taskSlice';
// import { useNavigate } from 'react-router-dom';
const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'title', headerName: 'Title', width: 600 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    { field: 'dueDate', headerName: 'Due Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 100 },
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
    noRowsLabel : "No Tasks"
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

const DataTable = () => {
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const documents = await appwriteService.getTasks();
                const updateTasks = await documents.map((task) => ({
                    ...task,
                    status: StatusGenerator(task.startDate, task.dueDate)
                }))
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

            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();

    }, [setTasks, dispatch, tasks]);

    return (
        <div style={{ height: 625, width: '100%' }}>
            <DataGrid
                rows={tasks}
                columns={columns}
                pageSize={5}
                localeText={localText}
            // checkboxSelection
            />
        </div>
    );
}

export default DataTable;
