import React from 'react'

export default function Footer() {
    return (
        <footer className="text-center text-white bg-info p-4">
            <em>
                &copy; {new Date().getFullYear()} Ashley N. Smith
            </em>
        </footer>
    )
}
