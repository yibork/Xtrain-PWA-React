import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs';
import { MdLocalDining } from 'react-icons/md';
import Footer from "../components/Navigation/Footer";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import AddMealModal from "../components/nutrition/AddMealModal";
import MealCard from '../components/Cards/Meal';
import {getMeals,getDialyMeals} from '../services/Diet';
import { MdAdd } from 'react-icons/md';
// Interfaces
interface Objective {
  name: string;
  consumed: number;
  total: number;
}

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

interface UserAddedMeal {
  name: string;
  calories: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  type: string;
}


interface ObjectiveConsumption {
  name: string;
  consumed: number;
  total: number;
  ratio: number;
}

// Main Component
const DietsPage: React.FC = () => {
  const navigate = useNavigate();
  const [mealSuggestions, setMealSuggestions] = useState<MealSuggestion[]>([]);
  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
  const [userAddedMeals, setUserAddedMeals] = useState<UserAddedMeal[]>([]);

  const token = localStorage.getItem('authToken') || '';
useEffect(() => {
  // Fetch daily meals using the service
  getDialyMeals(token).then((data) => {
    // Transform data if necessary to match UserAddedMeal structure
    const transformedData = data.map((meal: { meal: { name: any; total_calories: any; total_carbohydrates: any; total_protein: any; total_fat: any; }; }) => ({
      name: meal.meal.name,
      calories: meal.meal.total_calories,
      carbs: meal.meal.total_carbohydrates,
      protein: meal.meal.total_protein,
      fat: meal.meal.total_fat,
      type: 'meal.type', // Make sure this information is provided by your API
    }));
    setUserAddedMeals(transformedData);
    setObjectives((prevObjectives: Objective[]) => prevObjectives.map((objective: Objective) => {
    switch (objective.name) {
      case 'Carbs':
        return { ...objective, consumed: objective.consumed + (transformedData.carbs || 0) };
      case 'Protein':
        return { ...objective, consumed: objective.consumed + (transformedData.protein || 0) };
      case 'Fat':
        return { ...objective, consumed: objective.consumed + (transformedData.fat || 0) };
      default:
        return objective;
    }
  }));

  });
}, []);
  useEffect(() => {
    // Fetch meal suggestions using the service
    getMeals(token) // Replace token and dietId with actual values
      .then((data) => {
        setMealSuggestions(data);
      })
      .catch((error) => {
        console.error('Fetching meal suggestions failed', error);
      });
  }, []);
    console.log(mealSuggestions);


useEffect(() => {
  const storedObjectives = localStorage.getItem('userObjectives');
  if (storedObjectives) {
    const parsedObjectives = JSON.parse(storedObjectives);

    if (Array.isArray(parsedObjectives)) {
      setObjectives(parsedObjectives);
    } else if (typeof parsedObjectives === 'object' && parsedObjectives !== null) {
      // Extract only the specific attributes
      const constructedObjectives = [
        { name: 'Calories', consumed: 0, total: parsedObjectives.calories || 0 },
        { name: 'Proteins', consumed: 0, total: parsedObjectives.protein || 0 },
        { name: 'Fats', consumed: 0, total: parsedObjectives.fats || 0 },
        { name: 'Carbs', consumed: 0, total: parsedObjectives.carbs || 0 },
      ];
      setObjectives(constructedObjectives);
    } else {
      console.error('Unexpected format of stored objectives:', parsedObjectives);
      // Handle unexpected format appropriately
    }
  } else {
    navigate('/set-objectives');
  }
}, [navigate]);

  const handleAddMealModalOpen = () => {
    setIsAddMealModalOpen(true);
  };
  const handleMealSelect = (mealId: number) => {
    navigate(`/meal-detail/${mealId}`);
  };


  const handleAddMealModalClose = () => {

    setIsAddMealModalOpen(false);
  };
const [objectives, setObjectives] = useState<Objective[]>(() => {
  const storedObjectives = localStorage.getItem('userObjectives');
  return storedObjectives ? JSON.parse(storedObjectives) : [
    { name: 'Carbs', consumed: 0, total: 332 },
    { name: 'Protein', consumed: 0, total: 125 },
    { name: 'Fat', consumed: 0, total: 67 },
  ];
});

const handleSaveMeal = (meal: UserAddedMeal) => {
  setUserAddedMeals(prevMeals => [...prevMeals, meal]);
    setObjectives((prevObjectives: Objective[]) => prevObjectives.map((objective: Objective) => {
    switch (objective.name) {
        case 'Calories':
        return { ...objective, consumed: objective.consumed + meal.calories };
      case 'Carbs':
        return { ...objective, consumed: objective.consumed + (meal.carbs || 0) };
      case 'Proteins':
        return { ...objective, consumed: objective.consumed + (meal.protein || 0) };
      case 'Fats':
        return { ...objective, consumed: objective.consumed + (meal.fat || 0) };
      default:
        return objective;
    }
  }));
        const updatedObjectiveConsumption: ObjectiveConsumption[] = objectives.map((objective: Objective) => ({
      name: objective.name,
      consumed: objective.consumed,
      total: objective.total,
      ratio: objective.total > 0 ? objective.consumed / objective.total : 0,
    }));

    setObjectiveConsumption(updatedObjectiveConsumption);
        localStorage.setItem('consumptions', JSON.stringify(updatedObjectiveConsumption));

};
const [objectiveConsumption, setObjectiveConsumption] = useState<ObjectiveConsumption[]>(() => {
  const storedConsumption = localStorage.getItem('consumptions');
  return storedConsumption ? JSON.parse(storedConsumption) : objectives.map(obj => ({
    name: obj.name,
    consumed: obj.consumed,
    total: obj.total,
    ratio: obj.consumed / obj.total,
  }));
});



  useEffect(() => {
    const storedObjectives = localStorage.getItem('userObjectives');
    if (storedObjectives) {
      const parsedObjectives = JSON.parse(storedObjectives);
      // Make sure that parsedObjectives is an array before setting it to state
      if (Array.isArray(parsedObjectives)) {
        setObjectives(parsedObjectives.map((obj: any) => ({
          name: obj.name,
          consumed: 0, // Reset consumed to 0 initially
          total: obj.total,
        })));
      } else {
        console.error('Parsed objectives are not an array:', parsedObjectives);
      }
    } else {
      // If no objectives found, redirect to set objectives page
      navigate('/set-objectives');
    }
  }, [navigate]);

useEffect(() => {
  // Fetch objectives from local storage
  const storedObjectives = localStorage.getItem('consumptions');
  let objectivesFromStorage: Objective[];

  if (storedObjectives) {
    objectivesFromStorage = JSON.parse(storedObjectives);
  } else {
    // If no objectives are stored, initialize with default values or an empty array
    objectivesFromStorage = [
      // ... default objectives, if any ...
    ];
  }

  // Map through the stored objectives to calculate the ratio
  const updatedObjectiveConsumption: ObjectiveConsumption[] = objectivesFromStorage.map((objective: Objective) => ({
    name: objective.name,
    consumed: objective.consumed,
    total: objective.total,
    ratio: objective.total > 0 ? objective.consumed / objective.total : 0,
  }));

  setObjectiveConsumption(updatedObjectiveConsumption);
}, []); // Empty dependency array ensures this runs only on component mount



  const calculateProgressBarColor = (consumed: number, total: number): string => {
    const ratio = consumed / total;
    if (ratio < 0.5) return 'bg-red-600';
    if (ratio < 0.75) return 'bg-yellow-600';
    return 'bg-green-600';
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Objectives Section */}
      <section className="p-4">
  <h2 className="text-lg font-bold mb-4">Your Meals - {new Date().toLocaleDateString()}</h2>
</section>

      <section className="p-4">
        {objectiveConsumption.map((objective, index) => (
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

 <section>
  <div
      onClick={handleAddMealModalOpen}
      className="sticky top-0 absolute bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out flex items-center justify-center cursor-pointer"
      style={{
          width: 'auto', // Auto width to accommodate text
          height: '48px',
      }}
  >
      <MdAdd size={24} className="mr-2" /> {/* Icon with a smaller size */}
      <span>Add Daily Meal</span> {/* Descriptive text */}
  </div>
</section>




      {/* Meal Suggestions Section */}


      <section className="p-4">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mealSuggestions.map((meal) => (
        <div key={meal.id} onClick={() => handleMealSelect(meal.id)} className="cursor-pointer">
          <MealCard meal={meal} />
        </div>
      ))}
    </div>
  </div>
</section>

        <AddMealModal isOpen={isAddMealModalOpen} onClose={handleAddMealModalClose} onSave={handleSaveMeal} />

<section className="p-4">
  <h2 className="text-lg font-bold mb-4">Your Added Meals</h2>
  {userAddedMeals.map((meal, index) => (
    <div key={index} className="flex flex-col bg-white p-4 my-2 rounded-lg shadow">
      <div className="flex justify-between">
        <span className="font-semibold">{meal.name}</span>
        <span className="text-gray-500">{`${meal.calories} kcal`}</span>
      </div>
      <div className="text-sm text-gray-500">
        Carbs: {meal.carbs || 0}g | Protein: {meal.protein || 0}g | Fat: {meal.fat || 0}g
      </div>
    </div>
  ))}

</section>


    <Footer/>
    </div>
  );
};

export default DietsPage;