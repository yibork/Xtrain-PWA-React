import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface MealSuggestion {
  id: number;
  name: string;
  calories: number;
}

const MealSuggestionPage: React.FC = () => {
  const { mealType } = useParams<{ mealType: string }>();
  const [mealSuggestions, setMealSuggestions] = useState<MealSuggestion[]>([]);

  useEffect(() => {
    // Fetch meal suggestions based on mealType
    // This is a placeholder. You should replace it with your actual data fetching logic.
    const fetchedMealSuggestions: MealSuggestion[] = [
      { id: 1, name: 'Oatmeal with Fruits', calories: 300 },
      { id: 2, name: 'Whole Grain Toast with Avocado', calories: 350 },
      // ... other suggestions
    ];
    setMealSuggestions(fetchedMealSuggestions);
  }, [mealType]);

  return (
    <div>
      <h1>Meal Suggestions for {mealType}</h1>
      <div>
        {mealSuggestions.map((meal) => (
          <div key={meal.id}>
            <span>{meal.name}</span>
            <span>{`${meal.calories} kcal`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealSuggestionPage;
