import React from 'react';
import { UserProfile } from '../../types/user';
import { FaRunning, FaDumbbell, FaHeartbeat, FaUserEdit } from 'react-icons/fa';
import CalorieIntakeChart from "../Chart/CalorieIntakeChart";
import WeightChart from "../Chart/WeightChart";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { FaSignOutAlt } from 'react-icons/fa';

interface ProfileDetailsProps {
  userData: UserProfile;
  onEdit: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userData, onEdit }) => {
  const latestMacro = userData.day_macros?.[0] ?? {};
  const latestWeight = userData.day_weights?.[0] ?? {};
  const navigate = useNavigate(); // Initialize useNavigate

 const handleLogout = () => {
    // Clear the authentication token and navigate to the logout or home page
    localStorage.removeItem('authToken');
    navigate('/'); // Use navigate instead of history.push
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center pt-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs w-full mb-5">
        <div className="p-6">
          <div className="flex flex-col items-center">
            <img src={userData.picture || '/default-profile.png'} alt="Profile" className="rounded-full h-24 w-24 object-cover" />
            <h1 className="text-xl font-bold mt-4">{userData.first_name} {userData.last_name}</h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded">{userData.role}</span>
            <div className="flex mt-4 space-x-3">
              <FaRunning />
              <FaDumbbell />
              <FaHeartbeat />
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between">
            <span>Email</span>
            <span className="font-semibold">{userData.email}</span>
          </div>
           <div className="flex justify-between mt-3">
            <span>first name</span>
            <span className="font-semibold">{userData.first_name}</span>
          </div>
           <div className="flex justify-between mt-3">
            <span>last name</span>
            <span className="font-semibold">{userData.last_name}</span>
          </div>
          <div className="flex justify-between mt-3">
            <span>Phone</span>
            <span className="font-semibold">{userData.phone_number}</span>
          </div>
          {/* Display latest macro details */}
          <div className="flex justify-between mt-3">
            <span>Protein</span>
            <span className="font-semibold">{latestMacro.protein}g</span>
          </div>
          <div className="flex justify-between mt-3">
            <span>Fats</span>
            <span className="font-semibold">{latestMacro.fat}g</span>
          </div>
          <div className="flex justify-between mt-3">
            <span>Carbs</span>
            <span className="font-semibold">{latestMacro.carbs}g</span>
          </div>
          <div className="flex justify-between mt-3">
            <span>Calories</span>
            <span className="font-semibold">{latestMacro.calories}</span>
          </div>
          {/* Display latest weight details */}
          <div className="flex justify-between mt-3">
            <span>Weight</span>
            <span className="font-semibold">{latestWeight.weight}</span>
          </div>
          <button onClick={onEdit} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 w-full flex items-center justify-center">
            <FaUserEdit />
            <span className="ml-2">Edit Profile</span>
          </button>
          <button   onClick={handleLogout} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 w-full flex items-center justify-center">
        <FaSignOutAlt />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </div>

      {/* Diet and Calorie Charts */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs w-full p-6">
        <CalorieIntakeChart  />
        <WeightChart />
      </div>
    </div>
  );
};

export default ProfileDetails;
