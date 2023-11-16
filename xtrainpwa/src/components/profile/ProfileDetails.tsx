// ProfileDetails.tsx
import React from 'react';
import { UserProfile } from '../../types/user';
import { FaRunning, FaDumbbell, FaHeartbeat, FaUserEdit, FaChartBar } from 'react-icons/fa';
import CalorieBurnChart from '../Chart/CalorieBurnChart'; // This would be your chart component
import CalorieIntakeChart from "../Chart/CalorieIntakeChart";
import WeightChart from "../Chart/WeightChart";
interface ProfileDetailsProps {
  userData: UserProfile;
  onEdit: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userData, onEdit }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center pt-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs w-full mb-5">
        <div className="p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-yellow-300 rounded-full blur opacity-75"></div>
              <img src={userData.profilePicture} alt={`${userData.name}'s Profile`} className="relative rounded-full h-24 w-24 object-cover" />
            </div>
            <h1 className="text-xl font-bold mt-4">{userData.name}</h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">Level 10</span>
            <div className="flex mt-4 space-x-3">
              <FaRunning className="text-blue-600" />
              <FaDumbbell className="text-blue-600" />
              <FaHeartbeat className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 text-gray-600">
          <div className="flex justify-between">
            <span>Total Workouts</span>
            <span className="font-semibold">120</span>
          </div>
          <div className="flex justify-between mt-3">
            <span>Current Streak</span>
            <span className="font-semibold">8 days</span>
          </div>
          <div className="flex justify-between mt-3">
            <span>Longest Streak</span>
            <span className="font-semibold">26 days</span>
          </div>
          <button onClick={onEdit} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 w-full flex items-center justify-center">
            <FaUserEdit />
            <span className="ml-2">Edit Profile</span>
          </button>
        </div>

      </div>

      {/* Diet and Calorie Burn Chart */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs w-full p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
          <FaChartBar className="mr-2" />
          Calorie Burn Chart
        </h3>

        {/* Calorie Burn Chart goes here */}
        <CalorieBurnChart />
        <CalorieIntakeChart />
        <WeightChart />


      </div>
    </div>
  );
};

export default ProfileDetails;
