import React from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import { Container, Card, Jumbotron } from 'react-bootstrap'
import { useHistory } from 'react-router'

export default function Login() {
    const { authenticate } = useAuth();
    const history = useHistory();

    async function handleAuth() {
        await authenticate();
        history.push('/')
    }
    return (
        <div>
            <Jumbotron>
                <h1 className="nb-5">Login with GitHub</h1>
            </Jumbotron>
            <Card className="m-2 border-dar text-center">
                <Card.Header className="bg-dark text-white">
                    <h2>Login for full functionality</h2>
                </Card.Header>
                <Card.Body>
                    <button onClick={() => handleAuth()} className="btn btn-dark">
                        Login with GitHub
                    </button>
                </Card.Body>
            </Card>
        </div>
    )
}
