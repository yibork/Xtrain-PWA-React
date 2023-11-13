// Home.jsx
import React from 'react';
import NavBar from "../components/Navigation/NavBar";
import Footer from "../components/Navigation/Footer";
const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
        <div className="text-center p-8 pb-18">
            <h1 className="text-4xl text-blue-600 mb-4">Welcome to XTrain</h1>
            <p className="text-xl mb-8">Your ultimate trainee companion app.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 rounded-lg p-8 shadow hover:translate-y-[-5px] transition-transform">
                    <h2 className="text-2xl text-gray-800 mb-4">Track Your Workouts</h2>
                    <p className="mb-6">Log and analyze your workout routines.</p>
                    <button className="bg-blue-600 text-white py-2 px-5 rounded cursor-pointer hover:bg-blue-700">Start Training</button>
                </div>
                {/* Additional feature cards (repeat as needed) */}
                <div className="bg-gray-100 rounded-lg p-8 shadow hover:translate-y-[-5px] transition-transform">
                    <h2 className="text-2xl text-gray-800 mb-4">Manage Your Diet</h2>
                    <p className="mb-6">Keep track of your nutritional intake.</p>
                    <button className="bg-blue-600 text-white py-2 px-5 rounded cursor-pointer hover:bg-blue-700">View Diet Plans</button>
                </div>
                <div className="bg-gray-100 rounded-lg p-8 shadow hover:translate-y-[-5px] transition-transform">
                    <h2 className="text-2xl text-gray-800 mb-4">Chat With Our AI Coach</h2>
                    <p className="mb-6">Get instant advice on training and nutrition.</p>
                    <button className="bg-blue-600 text-white py-2 px-5 rounded cursor-pointer hover:bg-blue-700">Talk to Coach AI</button>
                </div>
                {/* More cards as needed */}
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default Home;
