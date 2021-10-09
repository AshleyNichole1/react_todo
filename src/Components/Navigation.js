import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'


export default function Navigation() {
    const { currentUser } = useAuth();
    return (
        <Navbar variant="dark" bg="dark" expand="md">
            <Navbar.Brand href="/">ToDos</Navbar.Brand>
            {/* Hamburger */}
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Nav>
                        {currentUser &&
                            <>
                                <Nav.Link href="/Todos">ToDo</Nav.Link>
                                <Nav.Link href="/Categories">Categories</Nav.Link>
                                <Nav.Link href="/logout">LogOut</Nav.Link>
                            </>
                        }
                        {!currentUser &&
                            <Nav.Link href="/Login">Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}
