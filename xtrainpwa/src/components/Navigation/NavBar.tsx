// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className=" bg-blue-300 text-white flex justify-between items-center p-4 h-15">
            <div className="text-xl font-bold">XTrain</div>
            <div className="flex">
                <Link to="/" className="text-white no-underline ml-8">Home</Link>
                <Link to="/features" className="text-white no-underline ml-8">Features</Link>
                <Link to="/about" className="text-white no-underline ml-8">About</Link>
                {/* Other links as needed */}
            </div>
        </nav>
    );
};

export default Navbar;
