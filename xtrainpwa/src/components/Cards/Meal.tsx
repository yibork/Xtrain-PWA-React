import React from 'react';

interface MealSuggestion {
  id: number;
  name: string;
  total_calories: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  type: string;
  picture: string;
}

interface MealCardProps {
  meal: MealSuggestion;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      {/* Replace "path-to-image" with actual property if your meal has an image */}
      <img className="w-full" src={meal.picture} alt={meal.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{meal.name}</div>
        <p>{`Calories: ${meal.total_calories
}`}</p>
      </div>
    </div>
  );
};

export default MealCard;
