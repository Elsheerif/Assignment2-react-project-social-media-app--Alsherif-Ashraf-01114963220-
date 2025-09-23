import { i } from "framer-motion/client";
import { createContext, useState } from "react";
import React from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("token") != null
    );

    return (
        <authContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </authContext.Provider>
    );
}
