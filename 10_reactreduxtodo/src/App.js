import React from 'react';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';

function App() {
  return (
    <>
    <div className='text-center text-4xl'>Learn About React Redux</div>
    <AddTodo/>
    <Todos/>
    </>
  );
}

export default App;
