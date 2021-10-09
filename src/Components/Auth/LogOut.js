import React from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import { useHistory } from 'react-router'
import Profile from './Profile'

export default function LogOut() {

    const { logout, currentUser } = useAuth();
    const history = useHistory();

    function handleAuth() {
        logout();
        history.push('/login');
    }

    return (
        <div className="text-center p-3 bg-dark text-white">
            <Profile />
            <button onClick={() => handleAuth()} className="btn btn-info">
                Logout
            </button>
        </div>
    )
}
