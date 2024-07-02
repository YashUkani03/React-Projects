// import React from 'react';
// // import { BrowserRouter as Router, Route, Routes, Outlet, } from 'react-router-dom';
// // import { Button } from '@mui/material';
// // import LoginForm from './LoginForm';
// // import SignupForm from './SignupForm';
// // import Home from './Home'; // Import the Home component
// // import { Login, Signup, Home, Header } from './components';
// import { Header } from './components';
// import { Outlet } from 'react-router-dom';

// function App() {
//   return (
//     <div>
//       <Header />
//       <Outlet />
//     </div>
//   )
// }

// export default App;


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import LoginForm from './components/LoginForm';
// import SignupForm from './components/SignupForm';
// import Home from './components/Home';
import { Header, Login, Signup, Home } from './components'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
