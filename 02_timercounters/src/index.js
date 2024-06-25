

import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client"

console.log("h");
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // console.log("count")
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, [count]);

  return <h1>I have rendered {count} times!</h1>;
}
console.log(`count`);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);
