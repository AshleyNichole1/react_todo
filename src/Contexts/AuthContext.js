import React, { useContext, useState, useEffect } from 'react'
import firebase from 'firebase'
import firebaseapp, { authResult } from '../base'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function authenticate() {

        const AuthProvider = new firebase.auth.GithubAuthProvider();
        return (
            firebaseapp.auth().signInWithPopup(AuthProvider).then(authHandler)
        )
    }

    async function authHandler(authData) {
        setCurrentUser(authData.user);
    }

    async function logout() {
        return firebaseapp.auth().signOut().then(setCurrentUser(null))
    }
    const value = {
        currentUser, authenticate, logout
    }

    useEffect(() => {
        const authChange = authResult.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return authChange;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}