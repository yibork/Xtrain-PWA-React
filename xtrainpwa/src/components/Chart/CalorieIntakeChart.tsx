// CalorieIntakeChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getCalorieIntakeData } from '../../services/User';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const CalorieIntakeChart: React.FC = () => {
  const token = localStorage.getItem('authToken') || '';
  const [calorieEntries, setCalorieEntries] = useState<{ date: string; calories: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming getCalorieIntakeData returns an array of objects with date and calories
        const fetchedData = await getCalorieIntakeData(token);
        setCalorieEntries(fetchedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  // Map the fetched data to the chart's format
  const data = {
    labels: calorieEntries.map(entry => entry.date), // Use the fetched dates
    datasets: [
      {
        label: 'Calorie Intake',
        data: calorieEntries.map(entry => entry.calories), // Use the fetched calorie values
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

export default CalorieIntakeChart;
