import React, { useState,useEffect, useCallback } from 'react';
import DisciplineSelection from '../components/Workout/DisciplineSelection';
import WorkoutRecommendations from '../components/Workout/WorkoutRecommendations';
import WorkoutTimer from '../components/Workout/WorkoutTimer';
import ProfileSection from "../components/Workout/ProfileSection";
import { Discipline, Workout } from './../types/Workout';
import { GiWeightLiftingUp, GiRunningShoe, GiLotus } from 'react-icons/gi';
import WorkoutHistory from '../components/Workout/WorkoutHistory';
import { WorkoutSession } from '../types/Workout';
import Footer from "../components/Navigation/Footer";

// Hardcoded disciplines data
const disciplines: Discipline[] = [
  {
    id: 1,
    name: 'Bodybuilding',
    icon: <GiWeightLiftingUp className="text-3xl" />,
  },
  {
    id: 2,
    name: 'Cardio',
    icon: <GiRunningShoe className="text-3xl" />,
  },
  {
    id: 3,
    name: 'Yoga',
    icon: <GiLotus className="text-3xl" />,
  },
  // ... other disciplines
];

// Hardcoded workouts data
const allWorkouts: Workout[] = [
  {
    id: 1,
    name: '5K Run',
    description: 'A quick outdoor running session.',
    duration: '30 mins',
    disciplineId: 2,
    caloriesPerMinute: 10,
    icon: <GiRunningShoe className="text-3xl" />,
  },
  {
    id: 2,
    name: 'Upper Body Strength',
    description: 'Gym session for upper body strength.',
    duration: '45 mins',
    disciplineId: 1,
    caloriesPerMinute: 8,
    icon: <GiWeightLiftingUp className="text-3xl" />,
  },
  {
    id: 3,
    name: 'Yoga Flexibility',
    description: 'Improve your flexibility with a yoga session.',
    duration: '60 mins',
    disciplineId: 3,
    caloriesPerMinute: 5,
    icon: <GiLotus className="text-3xl" />,
  },
  // ...add other workouts as needed
];

const WorkoutPage: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<number | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [activeWorkoutSession, setActiveWorkoutSession] = useState<{ workout: Workout; startTime: Date } | null>(null);
const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([]);
   const userData = {
    name: 'Yassine Ibork',
    profilePicture: 'http://91.234.194.146/media/users/Yassine6_M6bbi7J.jpg', // Replace with actual path
    progress: 72
  };
     useEffect(() => {
    // Load workout history from local storage
    const storedHistory = localStorage.getItem('workoutHistory');
    if (storedHistory) {
      setWorkoutHistory(JSON.parse(storedHistory));
    }
  }, []);

useEffect(() => {
  const storedHistory = localStorage.getItem('workoutHistory');
  if (storedHistory) {
    const parsedHistory = JSON.parse(storedHistory).map((session: { date: string | number | Date; }) => ({
      ...session,
      date: new Date(session.date) // Convert the string back to a Date object
    }));
    setWorkoutHistory(parsedHistory);
  }
}, []);

  const handleSelectDiscipline = (disciplineId: number) => {
    setSelectedDiscipline(disciplineId);
  };

  const handleSelectWorkout = (workoutId: number) => {
    const workout = allWorkouts.find((w) => w.id === workoutId);
    if (workout) {
      setSelectedWorkout(workout);
    }
  };

  const startWorkout = () => {
    if (selectedWorkout) {
      setActiveWorkoutSession({ workout: selectedWorkout, startTime: new Date() });
      setSelectedWorkout(null); // Clear selected workout to allow returning to workout list
    }
  };

const stopWorkout = () => {
  if (activeWorkoutSession) {
    const endTime = new Date();
    const duration = (endTime.getTime() - activeWorkoutSession.startTime.getTime()) / 60000; // Duration in minutes
    const caloriesBurned = duration * activeWorkoutSession.workout.caloriesPerMinute;

    const newSession = {
      workout: activeWorkoutSession.workout,
      duration,
      caloriesBurned,
      date: new Date(activeWorkoutSession.startTime.toISOString().split('T')[0]) // Store only the date part
    };

    // Update the state with the new session
    const updatedWorkoutHistory = [...workoutHistory, newSession];
    setWorkoutHistory(updatedWorkoutHistory);

    // Also update local storage with the new session
    localStorage.setItem('workoutHistory', JSON.stringify(updatedWorkoutHistory));

    setActiveWorkoutSession(null);
  }
};

  const filteredWorkouts = allWorkouts.filter((workout) => workout.disciplineId === selectedDiscipline);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <ProfileSection {...userData} />
      {!selectedDiscipline && (
        <DisciplineSelection disciplines={disciplines} onSelect={handleSelectDiscipline} />
      )}

       {selectedDiscipline && !selectedWorkout && !activeWorkoutSession && (
      <>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => setSelectedDiscipline(null)}>
          Back to Disciplines
        </button>
        <WorkoutRecommendations workouts={filteredWorkouts} onSelectWorkout={handleSelectWorkout} />
      </>
    )}

      {selectedWorkout && !activeWorkoutSession && (
  <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-6">
    <h2 className="text-2xl font-bold mb-3">{selectedWorkout.name}</h2>
    <p className="text-gray-700 mb-4">{selectedWorkout.description}</p>
    <div className="flex justify-between items-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        onClick={startWorkout}
      >
        Start Workout
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        onClick={() => setSelectedWorkout(null)}
      >
        Back to Workouts
      </button>
    </div>
  </div>
)}

     {activeWorkoutSession && (
  <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-6 text-center">
    <WorkoutTimer workout={activeWorkoutSession.workout} />
    <button
      className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
      onClick={stopWorkout}
    >
      Stop Workout
    </button>
  </div>
)}



      <WorkoutHistory workoutHistory={workoutHistory} />
      <Footer />
    </div>
  );
};

export default WorkoutPage;
