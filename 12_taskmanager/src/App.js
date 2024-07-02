import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Outlet, } from 'react-router-dom';
// import { Button } from '@mui/material';
// import LoginForm from './LoginForm';
// import SignupForm from './SignupForm';
// import Home from './Home'; // Import the Home component
// import { Login, Signup, Home, Header } from './components';
import { Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  // return (
  //   <Router>
  //     <div>
  //       <nav className="flex justify-around p-4">
  //         <Header />
  //       </nav>
  //       <Routes>
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/signup" element={<Signup />} />
  //         <Route path="/" element={<Home />} />
  //       </Routes>
  //     </div>
  //   </Router>
  // );

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default App;
