import React from 'react';
import { Workout } from '../../types/Workout';

interface Props {
  workouts: Workout[];
  onSelectWorkout: (workoutId: number) => void;
}

const WorkoutRecommendations: React.FC<Props> = ({ workouts, onSelectWorkout }) => {
  return (
    <div className="flex flex-wrap justify-center p-4">
      {workouts.map((workout) => (
        <div key={workout.id} className="m-4 p-4 bg-white rounded-lg shadow-md">
          {workout.icon}
          <h3 className="text-center text-lg font-bold">{workout.name}</h3>
          <p className="text-center">{workout.duration}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => onSelectWorkout(workout.id)}>Start Workout</button>
        </div>
      ))}
    </div>
  );
};

export default WorkoutRecommendations;
