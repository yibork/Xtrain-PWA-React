import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs';
import { MdLocalDining } from 'react-icons/md';
import Footer from "../components/Navigation/Footer";
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface MealType {
  type: string;
  calories: number;
}
interface MealType {
  type: string;
  calories: number;
}

interface Objective {
  name: string;
  consumed: number;
  total: number;
}

interface MealSuggestion {
  id: number;
  name: string;
  calories: number;
}

const mealTypes: MealType[] = [
  { type: 'Breakfast', calories: 816 },
  { type: 'Lunch', calories: 1088 },
  { type: 'Dinner', calories: 680 },
  { type: 'Snacks', calories: 136 },
];

const objectives: Objective[] = [
  { name: 'Carbs', consumed: 0, total: 332 },
  { name: 'Protein', consumed: 0, total: 133 },
  { name: 'Fat', consumed: 0, total: 88 },
];

const fetchMealSuggestions = async (): Promise<MealSuggestion[]> => {
  // Placeholder for fetching meal suggestions from an API
  return [
    { id: 1, name: 'Grilled Chicken Salad', calories: 350 },
    { id: 2, name: 'Vegan Tofu Stir Fry', calories: 400 },
    // Add more suggestions...
  ];
};

const calculateProgressBarColor = (consumed: number, total: number): string => {
  const ratio = consumed / total;
  if (ratio < 0.5) return 'bg-red-600';
  if (ratio < 0.75) return 'bg-yellow-600';
  return 'bg-green-600';
};


const DietsPage: React.FC = () => {
  const navigate = useNavigate();
    const [mealSuggestions, setMealSuggestions] = useState<MealSuggestion[]>([]);
  const [dietaryRestriction, setDietaryRestriction] = useState<string>('All');

  useEffect(() => {
    fetchMealSuggestions().then(setMealSuggestions);
  }, []);


  const mealTypes: MealType[] = [
    { type: 'Breakfast', calories: 816 },
    { type: 'Lunch', calories: 1088 },
    { type: 'Dinner', calories: 680 },
    { type: 'Snacks', calories: 136 },
  ];

  const handleAddMealClick = (mealType: string) => {
    navigate(`/meal-suggestions/${mealType}`);
  };
  return (
    <div className="bg-gray-100 min-h-screen">
                  {/* Objectives Section */}
      <section className="p-4">
        <h2 className="text-lg font-bold mb-4">Daily Objectives</h2>
        {objectives.map((objective, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-4 my-2 rounded-lg shadow">
            <AiOutlineCheckCircle className="text-gray-600 text-2xl" />
            <div className="flex-1">
              <span className="font-semibold">{objective.name}</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className={`h-2.5 rounded-full ${calculateProgressBarColor(objective.consumed, objective.total)}`} style={{ width: `${(objective.consumed / objective.total) * 100}%` }}></div>
              </div>
            </div>
            <span className="text-gray-500">{`${objective.consumed} / ${objective.total} g`}</span>
          </div>
        ))}
      </section>

      {/* Meal Types Section */}
      <section className="p-4">
        {mealTypes.map((meal, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-4 my-2 rounded-lg shadow">
            <MdLocalDining className="text-gray-600 text-3xl" />
            <span className="font-semibold">{meal.type}</span>
            <span className="text-gray-500">{`${meal.calories} kcal`}</span>
            <BsPlusCircle className="text-blue-600 text-3xl" onClick={() => handleAddMealClick(meal.type)} />
          </div>
        ))}
      </section>

      {/* Meal Suggestions Section */}
      <section className="p-4">
        <div className="mb-4">
          <label htmlFor="dietary-restriction" className="block mb-2 text-sm font-medium text-gray-900">Dietary Restriction</label>
          <select id="dietary-restriction" value={dietaryRestriction} onChange={e => setDietaryRestriction(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="All">All</option>
                  <option value="Vegan">Vegan</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Keto">Keto</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {mealSuggestions.map(meal => (
          <div key={meal.id} className="flex items-center justify-between bg-white p-4 my-2 rounded-lg shadow">
            <span className="font-semibold">{meal.name}</span>
            <span className="text-gray-500">{`${meal.calories} kcal`}</span>
            <BsPlusCircle className="text-blue-600 text-3xl" />
          </div>
        ))}
      </section>

      {/* Steps Tracking Section */}


      <Footer />
    </div>
  );
};

export default DietsPage;
