import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, toggleTask } from '../store/taskSlice';

function TaskList() {
    const tasks = useSelector((state) => state.task.tasks);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(removeTask(id));
    };

    const handleToggleComplete = (id) => {
        dispatch(toggleTask(id));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li key={task.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <span className={task.status ? 'line-through' : ''}>
                            {task.title}
                        </span>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleToggleComplete(task.id)}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                {task.status ? 'Undo' : 'Complete'}
                            </button>
                            <Link to={`/task/${task.id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Details
                            </Link>
                            <Link to={`/edit/${task.id}`} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <Link to="/add" className="mt-4 inline-block px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                Add New Task
            </Link>
        </div>
    );
}

export default TaskList;
