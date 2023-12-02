export interface Workout {
  id: number;
  name: string;
  description: string;
  duration: string;
  disciplineId: number;
  caloriesPerMinute: number;
  icon: JSX.Element;
}
export interface Discipline {
  id: number;
  name: string;
  icon: JSX.Element;
}

export interface WorkoutSession {
  workout: Workout;
  duration: number; // Duration in minutes
  caloriesBurned: number;
  date: Date;
}
