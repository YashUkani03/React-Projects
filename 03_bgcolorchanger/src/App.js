import './App.css';
import { useState } from 'react';

function App() {
  let [color, setColor] = useState("red")

  return (
    <div className='w-full h-screen duration-200' style={{ backgroundColor: color }}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl '>
          <button onClick={ () => setColor("red")}
          className='outline-none py-1 rounded-full px-4 text-white' style={{ backgroundColor: "red" }}>Red</button>

          <button onClick={ () => setColor("green")}
           className='outline-none py-1 rounded-full px-4 text-white' style={{ backgroundColor: "green" }}>Green</button>

          <button onClick={ () => setColor("olive")} 
          className='outline-none py-1 rounded-full px-4 text-white' style={{ backgroundColor: "olive" }}>Olive</button>

          <button onClick={ () => setColor("black")} 
          className='outline-none py-1 rounded-full px-4 text-white' style={{ backgroundColor: "black" }}>Black</button>

          <button onClick={ () => setColor("purple")} 
          className='outline-none py-1 rounded-full px-4 text-white' style={{ backgroundColor: "purple" }}>Purple</button>

          <button onClick={ () => setColor("blue")} 
          className='outline-none py-1 rounded-full px-4 text-white' style={{ backgroundColor: "blue" }}>Blue</button>

          <button onClick={ () => setColor("red")}
          className='outline-none py-1 rounded-full px-4 text-white' style={{ backgroundColor: "grey" }}>Grey</button>

        </div >
      </div >
    </div >
  );

}

export default App;
