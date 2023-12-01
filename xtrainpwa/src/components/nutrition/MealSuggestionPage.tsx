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

const [searchQuery, setSearchQuery] = useState('');

// Filtered meal suggestions based on search
const filteredMeals = mealSuggestions.filter(meal =>
  meal.name.toLowerCase().includes(searchQuery.toLowerCase())
);

return (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Meal Suggestions for {mealType}</h1>
    <input
      type="text"
      placeholder="Search meals"
      className="mb-4 p-2 border rounded"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredMeals.map((meal) => (
        <div key={meal.id} className="card bg-white shadow-lg hover:shadow-xl p-4 rounded-lg">
          <span className="text-lg font-semibold">{meal.name}</span>
          <span className="text-sm text-gray-600">{`${meal.calories} kcal`}</span>

        </div>
      ))}
    </div>
  </div>
);

};

export default MealSuggestionPage;
