import React, {useEffect, useState} from "react";
import {getMeals,addDailyMeal} from "../../services/Diet";
import { MealRecord,Meal } from "../../types/Diet";
interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (meal: UserAddedMeal) => void;
}
interface UserAddedMeal {
  name: string;
  calories: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  type: string;
}


const AddMealModal: React.FC<AddMealModalProps> = ({ isOpen, onClose, onSave }) => {
  const [mealName, setMealName] = useState('');
  const [mealCalories, setMealCalories] = useState('');
  const [mealProteins, setMealProteins] = useState('');
  const [mealCarbs, setMealCarbs] = useState('');
  const [mealFat, setMealFat] = useState('');
  const [mealType, setMealType] = useState(''); // default to an empty string
  const [isCustomMeal, setIsCustomMeal] = useState(false);
  const [selectedPredefinedMeal, setSelectedPredefinedMeal] = useState('');
  const handleIsCustomMealChange = (isCustom: boolean) => {
    setIsCustomMeal(isCustom);
    if (isCustom) {
      setSelectedPredefinedMeal(''); // Reset predefined meal selection
    }
  };
  const [fetchedMeals, setFetchedMeals] = useState<Meal[]>([]); // New state for fetched meals

  const handleSave = () => {
    if (isCustomMeal) {
      const newMeal = {
        name: mealName,
        calories: parseInt(mealCalories, 10),
        carbs: parseInt(mealCarbs, 10),
        protein: parseInt(mealProteins, 10),
        fat: parseInt(mealFat, 10),
        type: mealType
      };
      onSave(newMeal);
    } else {
      const predefinedMeal = fetchedMeals.find(meal => meal.name === selectedPredefinedMeal);
      console.log(predefinedMeal);
      console.log(token);
      if (predefinedMeal) {
        const MealRecord:MealRecord={
          meal:predefinedMeal,
          date: new Date().toISOString().split('T')[0], // Converts date to YYYY-MM-DD format
        }
        addDailyMeal(token, MealRecord);
      onSave({
        name: predefinedMeal.name,
        calories: predefinedMeal.total_calories,
        carbs: predefinedMeal.total_carbohydrates,
        protein: predefinedMeal.total_protein,
        fat: predefinedMeal.total_fat,
        type: 'morning'
      });
      }


    }
    // Reset the form fields
    setMealName('');
    setMealCalories('');
    setMealCarbs('');
    setMealProteins('');
    setMealFat('');
    setMealType('');
    setIsCustomMeal(false); // Reset the toggle
    onClose();
  };
      const token = localStorage.getItem('authToken') || '';


  useEffect(() => {
    const token = localStorage.getItem('authToken') || '';
    getMeals(token)
      .then((data) => {
        setFetchedMeals(data); // Update the state with fetched meals
      })
      .catch((error) => {
        console.error('Fetching meal suggestions failed', error);
      });
  }, []);
  return isOpen ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">Add a Meal</h3>
        <label className="flex items-center space-x-3 mb-4">
          <input
            type="checkbox"
            checked={isCustomMeal}
            onChange={(e) => handleIsCustomMealChange(e.target.checked)}
            className="form-checkbox h-5 w-5"
          />
          <span className="text-gray-700 font-normal">
            Custom Meal
          </span>
        </label>
        {/* Only show the custom meal form fields if isCustomMeal is true */}
        {isCustomMeal && (
          <>
            <input type="text" placeholder="Meal Name" value={mealName} onChange={(e) => setMealName(e.target.value)} className="mb-4 p-2 border rounded w-full" />
            <input type="number" placeholder="Calories" value={mealCalories} onChange={(e) => setMealCalories(e.target.value)} className="mb-4 p-2 border rounded w-full" />
            <input type="number" placeholder="Carbs (g)" value={mealCarbs} onChange={(e) => setMealCarbs(e.target.value)} className="mb-4 p-2 border rounded w-full" />
            <input type="number" placeholder="Proteins (g)" value={mealProteins} onChange={(e) => setMealProteins(e.target.value)} className="mb-4 p-2 border rounded w-full" />
            <input type="number" placeholder="Fat (g)" value={mealFat} onChange={(e) => setMealFat(e.target.value)} className="mb-4 p-2 border rounded w-full" />
            <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="mb-4 p-2 border rounded w-full">
              <option value="">Select Meal Type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snacks">Snacks</option>
            </select>
          </>
        )}
      {!isCustomMeal && (
      <select value={selectedPredefinedMeal} onChange={(e) => setSelectedPredefinedMeal(e.target.value)} className="mb-4 p-2 border rounded w-full">
        <option value="">Select a predefined meal</option>
        {fetchedMeals.map((meal) => ( // Use fetchedMeals here
          <option key={meal.id} value={meal.name}>{meal.name}</option>
        ))}
      </select>
    )}

        <button onClick={handleSave} className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full">
          Save Meal
        </button>
        <button onClick={onClose} className="mt-2 text-center w-full underline">
          Close
        </button>
      </div>
    </div>
  ) : null;
};
export default AddMealModal;