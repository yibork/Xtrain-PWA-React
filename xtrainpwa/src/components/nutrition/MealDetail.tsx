import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMealsForDiet } from '../../services/Diet';

interface Ingredient {
  name: string;
  amount: string;
  icon?: string;
}
interface item {
    name: string;
    calories: number;
    carbohydrates: number;
    fat: number;
    protein: number;
    image: string;

}
interface Meal {
  id: string;
  name: string;
  picture: string;
  total_calories: number;
  total_fat: number;
  total_carbohydrates: number;
  total_protein: number;
  ingredients: Ingredient[];
  food_item:item[];
}

const MealDetail: React.FC = () => {
  const [meal, setMeal] = useState<Meal | null>(null);
  const { mealId } = useParams<{ mealId?: string }>();
  const token = localStorage.getItem('authToken') || '';
  const navigate = useNavigate();
  useEffect(() => {
    if (mealId && token) {
      getMealsForDiet(token, mealId)
        .then((data: Meal) => {
          // Ensure data.ingredients is defined here
          setMeal({ ...data, ingredients: data.ingredients || [] });
        })
        .catch((error: any) => {
          console.error('Fetching meals failed', error);
        });
    }
  }, [mealId, token]);
  console.log(meal);
  if (!meal) {
    return <div>Loading...</div>;
  }
  // Now we can safely check for ingredients length as it's guaranteed to be an array
  const ingredientsList = meal.food_item.length > 0 ? (
    meal.food_item.map((ingredient, index) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden shadow-md p-4 grid grid-cols-3 items-center gap-4"
        >
          <div className="col-span-1 flex items-center">
            <img
              src={ingredient.image || '/placeholder.png'}
              alt={ingredient.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div className="col-span-2">
            <h3 className="text-lg font-semibold">{ingredient.name}</h3>
            <p className="text-sm text-gray-600">
              Calories: {ingredient.calories}, Carbs: {ingredient.carbohydrates}, Fat: {ingredient.fat}, Protein: {ingredient.protein}
            </p>
          </div>
        </div>

    ))
  ) : (
    <div>No ingredients found.</div>
  );
  const navigateToDiet = () => {
    // Use navigate to go to the Diet page
    navigate('/diet'); // Replace '/diet' with the actual route of your Diet page
  };


  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-xl mx-auto max-w-sm md:max-w-lg">
      <img className="w-full h-64 object-cover" src={meal.picture} alt={meal.name} />
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold mb-4">{meal.name}</h2>
        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Nutritional Information</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-gray-600">Calories</span>
              <span className="font-bold">{meal.total_calories}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fat</span>
              <span className="font-bold">{meal.total_fat}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Carbs</span>
              <span className="font-bold">{meal.total_carbohydrates}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Protein</span>
              <span className="font-bold">{meal.total_protein}g</span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Ingredients</h3>
                    {ingredientsList}

        </div>
                <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={navigateToDiet}
        >
          Go to Diet
        </button>

      </div>
    </div>
  );
};

export default MealDetail;
