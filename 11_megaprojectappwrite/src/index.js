import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store/store"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from './components';
// import { Home, AddPosts, AllPosts, Post,  Editposts  } from './pages'
import Home from './pages/Home';
import Sign from './pages/Sign';
import AddPosts from './pages/AddPosts'
import Editposts from './pages/Editposts'
import Post from './pages/Post'
import AllPosts from './pages/Allposts'
import Signin from './pages/Signin';


const router = createBrowserRouter([
  {

    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Signin />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Sign />
          </AuthLayout>
        )
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication>
            {""}
            <AddPosts />
          </AuthLayout>
        )
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication>
            {""}
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            <Editposts />
          </AuthLayout>
        )
      },
      {
        path: 'post/:slug',
        element: (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        )
      }
    ]
  }
])


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App />} />,
//     <Route path='' element={<Home />} />,
//     <Route path='/login' element={
//       <AuthLayout authentication={true}>
//         <Signin />
//       </AuthLayout>
//     } />,
//     <Route path='/signup' element={
//       <AuthLayout authentication={true}>
//         <Sign />
//       </AuthLayout>
//     } />,
//     <Route path='/add-posts' element={
//       <AuthLayout>
//         <AddPosts />
//       </AuthLayout>
//     } />,
//     <Route path='/all-posts' element={
//       <AuthLayout>
//         <AllPosts />
//       </AuthLayout>
//     } />,
//     <Route path='/edit-posts' element={
//       <AuthLayout>
//         <Editposts />
//       </AuthLayout>
//     } />,
//     <Route path='/post' element={
//       <AuthLayout>
//         <Post />
//       </AuthLayout>
//     } />,

//   )
// )



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
