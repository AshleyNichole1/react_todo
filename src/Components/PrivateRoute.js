import React from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { Route, Redirect } from 'react-router'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();
    return (
        <Route {...rest} render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to="/login" />
        }}>
        </Route>
    )
}
