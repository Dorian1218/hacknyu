"use client"

import { useEffect, useState, useContext } from "react";
import { createContext } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const authContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
        return unsubscribe
    }, [])
    const signup = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
    }
    const logout = async () => { await signOut(auth) }
    const signIn = async (email, password) => { await signInWithEmailAndPassword(auth, email, password) }
    return (
        <authContext.Provider value={{user, signup, logout, signIn}}>
            {children}
        </authContext.Provider>
    )
}

export function useAuth() {
    return useContext(authContext)
}
