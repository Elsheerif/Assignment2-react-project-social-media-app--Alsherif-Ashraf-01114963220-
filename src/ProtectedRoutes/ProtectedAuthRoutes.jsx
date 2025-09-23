import React from 'react'
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../contexts/AuthContext';

export default function ProtectedAuthRoutes({ children }) {
    const { isLoggedIn } = useContext(authContext)
    return !isLoggedIn ? children : <Navigate to={"/"} />
}
