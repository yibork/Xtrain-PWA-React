// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="flex md:hidden justify-around items-center bg-blue-300 text-white shadow-md fixed bottom-0 left-0 right-0 z-50 py-3">
            <Link to="/" className="text-center text-white no-underline text-sm">
                {/* Replace material-icons with suitable icons */}
                <span>Home</span>
            </Link>
            {/* Add other links as needed */}
        </footer>
    );
};

export default Footer;
