import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/Login';
import Signup from './components/Signup';
import AddTask from './pages/AddTask';
import DataTable from './components/DataTable';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/login',
        element: <LoginForm />,

      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/add-task',
        element: <AddTask />
      },
      {
        path: '/table',
        element: <DataTable />
      },
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    {/* <App /> */}
  </Provider>
);

