// WeightChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
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
const WeightChart: React.FC = () => {
  const data = {
    labels: Array.from(new Array(30), (_, i) => `Day ${i + 1}`), // Days of the month as labels
    datasets: [
      {
        label: 'Weight (kg)',
        data: new Array(30).fill(null).map(() => Math.random() * 5 + 70), // Replace with actual weight data
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  );
};

export default WeightChart;
