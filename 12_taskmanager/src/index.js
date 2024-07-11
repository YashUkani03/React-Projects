import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './components/Login';
import Signup from './components/Signup';
import AddTask from './pages/AddTask';
import { AuthLayout, ColumnTable } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <AuthLayout authentication>
            <Home />
          </AuthLayout>)
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <LoginForm />
          </AuthLayout>)

      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>)
      },
      {
        path: '/add-task',
        element: (
          <AuthLayout authentication>
            <AddTask />
          </AuthLayout>)
      },
      {
        path: '/columntable',
        element: (
          <AuthLayout authentication>
            <ColumnTable />
          </AuthLayout>)
      }

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

