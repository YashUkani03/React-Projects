// import React from "react";


// export default function LoginForm() {
//     const [state, setState] = useState({
//         userName: '',
//         password: ''
//     })
//     const validate = () => {
//         let Display = state;
//         console.log(Display);
//     }
//     return (
//         <div style={{ textAlign: "center", padding: "5px" }}>
//             <label for="username">Username: </label>
//             <input name="username" type="text"
//                 value={state.userName}
//                 onChange={(e) => setState({...state, userName: e.target.value})}
//                  />
//             <br />
//             <label for="password">Password: </label>
//             <input
//                 name="password"
//                 type="password"
//                 value={state.password}
//                 onChange={(e) => setState({...state, password: e.target.value})} />
//             <br />
//             <button type="submit" onClick={(e) => validate(e)}>Submit</button>
//         </div>
//     )
// }
// import { useState, useEffect } from "react";
// import ReactDOM from "react-dom/client"

// console.log("h");
// function Timer() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     setTimeout(() => {
//       setCount((count) => count + 1);
//     }, 1000);
//   }, []);

//   return <h1>I have rendered {count} times!</h1>;
// }
// console.log(`count`);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Timer />);