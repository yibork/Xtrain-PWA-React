// Home.jsx
import React from 'react';
import NavBar from "../components/Navigation/NavBar";
import Footer from "../components/Navigation/Footer";

const Home = () => {
    return (
        <div>
        <NavBar/>
        <div className="text-center p-8 text-orange-500">
            <h1 className="text-4xl text-blue-600 mb-4">Welcome to XTrain</h1>
            <p className="text-xl mb-8">Your ultimate trainee companion app.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Feature Cards */}
                <div className="bg-gray-100 rounded-lg p-8 shadow-md hover:translate-y-[-5px] transition-transform">
                    <h2 className="text-2xl text-gray-800 mb-4">Track Your Workouts</h2>
                    <p className="mb-6">Log and analyze your workout routines.</p>
                    <button className="bg-blue-600 text-white border-none py-2 px-5 rounded-lg cursor-pointer text-lg hover:bg-blue-700">Start Training</button>
                </div>
                {/* Repeat for other feature cards */}
            </div>
        </div>
        <Footer/>
            </div>
    );
};

export default Home;
