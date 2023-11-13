// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const Navbar = () => {
    return (
        <nav className="bg-blue-300 text-white flex justify-between items-center p-4 h-15">
            <div className="text-xl font-bold tracking-wide">XTrain</div>
            <div className="flex">
                <Link to="/home" className="text-white no-underline ml-8 text-lg">Home</Link>
                <Link to="/features" className="text-white no-underline ml-8 text-lg">Features</Link>
                <Link to="/about" className="text-white no-underline ml-8 text-lg">About</Link>
                {/* Add other links as needed */}
            </div>
        </nav>
    );
};

export default Navbar;
