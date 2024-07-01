// components/Login.js
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';

function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    dispatch(login(credentials));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input 
              type="text" 
              name="username" 
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default Login;

<!--  -->

// components/TaskList.js
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleComplete } from '../actions/taskActions';

function TaskList() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <span className={task.completed ? 'line-through' : ''}>
              {task.title}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleToggleComplete(task.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                {task.completed ? 'Undo' : 'Complete'}
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

<!--  -->

// components/TaskDetails.js
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

function TaskDetails() {
  const { id } = useParams();
  const task = useSelector(state => state.tasks.tasks.find(task => task.id === id));

  if (!task) {
    return <p>Task not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">{task.title}</h2>
        <p className="mb-4">{task.description}</p>
        <p className="mb-4"><strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}</p>
        <Link to={`/edit/${task.id}`} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
          Edit
        </Link>
        <Link to="/" className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
          Back to Task List
        </Link>
      </div>
    </div>
  );
}

export default TaskDetails;

<!--  -->

// components/AddTask.js
import { useDispatch } from 'react-redux';
import { addTask } from '../actions/taskActions';
import { useHistory } from 'react-router-dom';

function AddTask() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title: e.target.title.value,
      description: e.target.description.value,
      completed: false,
    };
    dispatch(addTask(newTask));
    history.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input 
              type="text" 
              name="title" 
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea 
              name="description" 
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500" 
              required 
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
