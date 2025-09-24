import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import MainLayout from './layouts/MainLayout'
import PostDetailsPage from './pages/PostDetailsPage'
import FeedPage from './pages/FeedPage'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import ProtectedAuthRoutes from './ProtectedRoutes/ProtectedAuthRoutes'
import  AuthContextProvider  from './contexts/AuthContext'

const router = createBrowserRouter([
  {
    path: '', element: <AuthLayout />, children: [
      { path: '/login', element: <ProtectedAuthRoutes> <LoginPage /> </ProtectedAuthRoutes> },
      { path: '/register', element: <ProtectedAuthRoutes> <RegisterPage /> </ProtectedAuthRoutes> },

    ]
  }
  , {
    path: '', element: <MainLayout />, children: [
      { index: true, element: <ProtectedRoute> <FeedPage /> </ProtectedRoute> },
      { path: 'post-details', element: <PostDetailsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: '*', element: <NotFoundPage /> },


    ]
  }

])
function App() {


  return (<>
    <RouterProvider router={router} />

  </>
  )
}

export default App
