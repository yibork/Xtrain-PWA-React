// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { IoIosFitness, IoIosRestaurant } from 'react-icons/io';

const Footer = () => {
    return (
        <div>
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

        <footer className="bg-blue-300 text-white fixed bottom-0 left-0 right-0 p-4 flex justify-around md:hidden">
            <Link to="/" className="flex flex-col items-center">
                <AiOutlineHome size="1.5em" />
                <span className="text-xs">Home</span>
            </Link>
            <Link to="/workouts" className="flex flex-col items-center">
                <IoIosFitness size="1.5em" />
                <span className="text-xs">Workouts</span>
            </Link>
            <Link to="/nutrition" className="flex flex-col items-center">
                <IoIosRestaurant size="1.5em" />
                <span className="text-xs">Nutrition</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center">
                <AiOutlineUser size="1.5em" />
                <span className="text-xs">Profile</span>
            </Link>

        </footer>
    </div>
    );
};

export default Footer;
