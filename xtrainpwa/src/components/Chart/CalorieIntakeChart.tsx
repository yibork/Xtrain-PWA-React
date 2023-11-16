// CalorieIntakeChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Ensure you import Chart from 'chart.js/auto' to register controllers, elements, scales, and plugins.
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
  const data = {
    labels: Array.from(new Array(30), (_, i) => `Day ${i + 1}`), // Days of the month as labels
    datasets: [
      {
        label: 'Calorie Intake',
        data: new Array(30).fill(null).map(() => Math.random() * 500 + 1500), // Replace with actual calorie data
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
