// CalorieBurnChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CalorieBurnChart: React.FC = () => {
  const data = {
    labels: Array.from(new Array(30), (_, i) => i + 1), // Days of the month
    datasets: [
      {
        label: 'Calories Burned',
        data: new Array(30).fill(null).map(() => Math.round(Math.random() * 500 + 200)), // Random data for demonstration
        backgroundColor: 'rgba(59, 130, 246, 0.5)', // Tailwind CSS blue-500 with opacity
        borderColor: 'rgba(59, 130, 246, 1)', // Tailwind CSS blue-500
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
    // Enclose the Bar chart in a div that controls its size
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  );};

export default CalorieBurnChart;
