// components/WorkoutHistory.tsx
import React from 'react';
import { WorkoutSession } from '../../types/Workout';

interface Props {
  workoutHistory: WorkoutSession[];
}

const WorkoutHistory: React.FC<Props> = ({ workoutHistory }) => {
  // Define the type for the accumulator
  type HistoryMap = Record<string, WorkoutSession[]>;

  // Group workouts by day
  const groupedHistory = workoutHistory.reduce((acc: HistoryMap, session) => {
    const date = session.date.toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(session);
    return acc;
  }, {} as HistoryMap); // Initialize the accumulator as an empty object of type HistoryMap

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Workout History</h2>
      {Object.entries(groupedHistory).map(([date, sessions]) => (
        <div key={date} className="mb-4 bg-white shadow-lg rounded-lg overflow-hidden">
          <h3 className="bg-gray-800 text-white text-lg font-semibold p-4">{date}</h3>
          <ul className="divide-y divide-gray-200">
            {sessions.map((session, index) => (
             <li key={index} className="px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
  <span className="font-medium">{session.workout.name}</span>
  <div className="flex items-center mt-2 sm:mt-0">
    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
      Duration: {session.duration.toFixed(2)} mins
    </span>
    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
      Calories: {session.caloriesBurned.toFixed(2)}
    </span>
  </div>
</li>

            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WorkoutHistory;
