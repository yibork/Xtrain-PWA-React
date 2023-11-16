// Footer.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { IoIosFitness, IoIosRestaurant } from 'react-icons/io';

const Footer = () => {
        const location = useLocation();
     const getLinkClassNames = (path:any) => {
        return `flex flex-col items-center ${
            location.pathname === path ? 'text-blue-600' : 'text-white'
        } hover:text-blue-600`;
    };
    return (
        <div className="pt-16">
            {/* Desktop footer  */}
        <footer className="bg-blue-200 text-white py-4 hidden md:block">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <Link to="/" className="text-lg font-semibold text-blue-800 hover:text-blue-600">XTrain</Link>
                    </div>
                    <div className="flex justify-center space-x-6">
                        <Link to="/about" className="text-sm text-blue-800 hover:text-blue-600">About</Link>
                        <Link to="/services" className="text-sm text-blue-800 hover:text-blue-600">Services</Link>
                        <Link to="/contact" className="text-sm text-blue-800 hover:text-blue-600">Contact</Link>
                        {/* Add other links as needed */}
                    </div>
                    <div className="text-sm text-blue-800 mt-4 md:mt-0">
                        © 2023 XTrain, Inc. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
            {/* Mobile footer */}
            <footer className="bg-blue-300 text-white fixed inset-x-0 bottom-0 p-4 flex justify-around md:hidden">
                <Link to="/" className={getLinkClassNames('/')}>
                    <AiOutlineHome size="1.5em" />
                    <span className="text-xs">Home</span>
                </Link>
                <Link to="/workout" className={getLinkClassNames('/workout')}>
                    <IoIosFitness size="1.5em" />
                    <span className="text-xs">Workouts</span>
                </Link>
                <Link to="/diet" className={getLinkClassNames('/diet')}>
                    <IoIosRestaurant size="1.5em" />
                    <span className="text-xs">Nutrition</span>
                </Link>
                <Link to="/profile" className={getLinkClassNames('/profile')}>
                    <AiOutlineUser size="1.5em" />
                    <span className="text-xs">Profile</span>
                </Link>
            </footer>

    </div>
    );
};

export default Footer;
