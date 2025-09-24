import { createContext, useState, useEffect } from "react";





export const authContext = createContext()


export default function AuthContextProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null)

    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem("token")
            setIsLoggedIn(token != null)
        }

        // Listen for storage changes (when token is set/removed in other tabs)
        window.addEventListener('storage', checkAuthStatus)
        
        // Check auth status on mount
        checkAuthStatus()

        return () => {
            window.removeEventListener('storage', checkAuthStatus)
        }
    }, [])

    return <authContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
    </authContext.Provider>
}