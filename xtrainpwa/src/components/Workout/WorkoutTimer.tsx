import React, { useState, useEffect } from 'react';
import { Workout } from '../../types/Workout';

interface WorkoutTimerProps {
  workout: Workout;
}

const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ workout }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalWorkoutSeconds = parseInt(workout.duration) * 60;

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Current Session: {workout.name}</h2>
      <div className="text-lg font-medium">
        Time Elapsed: {new Date(seconds * 1000).toISOString().substr(11, 8)}
      </div>
      {seconds > totalWorkoutSeconds && (
        <div className="text-red-500 mt-4">
          You have exceeded your planned workout duration!
        </div>
      )}
    </div>
  );
};

export default WorkoutTimer;
