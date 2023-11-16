// WorkoutPage.jsx
import React from 'react';
import { GiRunningShoe, GiWeightLiftingUp, GiLotus } from 'react-icons/gi';
import Footer from "../components/Navigation/Footer";

// Example workouts data
const workouts = [
  {
    id: 1,
    name: '5K Run',
    description: 'A quick outdoor running session.',
    duration: '30 mins',
    icon: <GiRunningShoe className="text-3xl" />,
  },
  {
    id: 2,
    name: 'Upper Body Strength',
    description: 'Gym session for upper body strength.',
    duration: '45 mins',
    icon: <GiWeightLiftingUp className="text-3xl" />,
  },
  {
    id: 3,
    name: 'Yoga Flexibility',
    description: 'Improve your flexibility with a yoga session.',
    duration: '60 mins',
    icon: <GiLotus className="text-3xl" />,
  },
  // ...other workouts
];

const WorkoutPage = () => {
  // Function to navigate to the workout details - Placeholder for actual navigation logic
  const goToWorkoutDetails = (workoutId:any) => {
    console.log('Navigate to details of workout id:', workoutId);
    // In a real app, this could use the useHistory hook from 'react-router-dom'
    // history.push(`/workout/${workoutId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-4xl text-center text-blue-600 font-bold mb-10">Workouts</h1>
      <div className="space-y-4">
        {workouts.map((workout) => (
          <div key={workout.id} className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="mr-4">{workout.icon}</div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold">{workout.name}</h3>
              <p className="text-gray-500">{workout.description}</p>
              <p className="text-gray-700">{workout.duration}</p>
            </div>
            <button
              onClick={() => goToWorkoutDetails(workout.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default WorkoutPage;
