import './App.css';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';

function App() {
  return (
    <>
      <div className='text-3xl text-center bg-gray-300'> Redux Toolkit Todo Project</div>
      <AddTodo />
      <Todos />
    </>
  );
}

export default App;
