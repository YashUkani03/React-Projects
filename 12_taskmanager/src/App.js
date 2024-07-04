import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux"
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';


function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  })

  return !loading ? (
    <div className="flex flex-col min-h-screen">
      < Header />
      <Outlet />
      <Footer />
    </div>
  )
    : null
}

export default App;


// import React from 'react'
// import Taskslists from './pages/Tasklist'

// function App() {
//   return (
//     <div className=''> 
//       <Taskslists />
//     </div>
//   )
// }

// export default App;

