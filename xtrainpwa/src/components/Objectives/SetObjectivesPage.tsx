import React, { useState, FormEvent } from 'react';

const SetObjectivesPage: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [objective, setObjective] = useState<string>('');
  const [gymFrequency, setGymFrequency] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('');
  const [dietPreference, setDietPreference] = useState<string>('');

  const calculateNutrition = () => {
    const weightNum = parseFloat(weight) || 0;
    const heightNum = parseFloat(height) || 0;
    const ageNum = parseInt(age) || 0;

    let bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    let activityFactor = activityLevel === 'active' ? 1.75 : activityLevel === 'moderate' ? 1.55 : 1.2;
    let calories = bmr * activityFactor;

    switch (objective) {
      case 'losing':
        calories *= dietPreference === 'strict' ? 0.75 : 0.9;
        break;
      case 'maintaining':
        break;
      case 'bulking':
        calories *= dietPreference === 'strict' ? 1.15 : 1.05;
        break;
      default:
        break;
    }

    if (gymFrequency === 'frequent') {
      calories += 300;
    } else if (gymFrequency === 'rarely') {
      calories -= 300;
    }

    let proteinGrams = weightNum * 1.8;
    let fatGrams = (calories * 0.25) / 9;
    let carbGrams = (calories - proteinGrams * 4 - fatGrams * 9) / 4;

    return {
      calories: Math.round(calories),
      protein: Math.round(proteinGrams),
      fats: fatGrams.toFixed(2),
      carbs: Math.round(carbGrams)
    };
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nutrition = calculateNutrition();
    const userObjectives = {
      weight,
      height,
      age,
      objective,
      gymFrequency,
      activityLevel,
      dietPreference,
      ...nutrition
    };
    localStorage.setItem('userObjectives', JSON.stringify(userObjectives));
    window.location.href = '/';
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Set Your Objectives</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Weight Input */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Weight (kg):
          </label>
          <input
            id="weight"
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your weight"
          />
        </div>

        {/* Height Input */}
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">
            Height (cm):
          </label>
          <input
            id="height"
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your height"
          />
        </div>

        {/* Age Input */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age:
          </label>
          <input
            id="age"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your age"
          />
        </div>

        {/* Objective Input */}
        <div>
          <label htmlFor="objective" className="block text-sm font-medium text-gray-700">
            Objective:
          </label>
          <select
            id="objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select your objective</option>
            <option value="losing">Lose Weight</option>
            <option value="maintaining">Maintain Weight</option>
            <option value="bulking">Gain Weight</option>
          </select>
        </div>

        {/* Gym Frequency Input */}
        <div>
          <label htmlFor="gymFrequency" className="block text-sm font-medium text-gray-700">
            Gym Frequency:
          </label>
          <select
            id="gymFrequency"
            value={gymFrequency}
            onChange={(e) => setGymFrequency(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select your gym frequency</option>
            <option value="frequent">Frequent (4+ times a week)</option>
            <option value="occasional">Occasional (2-3 times a week)</option>
            <option value="rarely">Rarely (less than once a week)</option>
          </select>
        </div>

        {/* Activity Level Input */}
        <div>
          <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700">
            Activity Level:
          </label>
          <select
            id="activityLevel"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select your activity level</option>
            <option value="active">Active (regularly exercising)</option>
            <option value="moderate">Moderately Active (light exercise/sports)</option>
            <option value="sedentary">Sedentary (little or no exercise)</option>
          </select>
        </div>

        {/* Diet Preference Input */}
        <div>
          <label htmlFor="dietPreference" className="block text-sm font-medium text-gray-700">
            Diet Preference:
          </label>
          <select
            id="dietPreference"
            value={dietPreference}
            onChange={(e) => setDietPreference(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select your diet preference</option>
            <option value="strict">Strict (larger calorie deficit/surplus)</option>
            <option value="moderate">Moderate (moderate calorie deficit/surplus)</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Save Objective
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetObjectivesPage;
