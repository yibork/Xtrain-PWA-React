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

            {/* Mobile footer */}
            <footer className="bg-blue-300 text-white fixed inset-x-0 bottom-0 p-4 flex justify-around ">
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
