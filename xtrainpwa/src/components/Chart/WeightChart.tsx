import React, { useState, useEffect } from 'react';
import { getDayWeights } from '../../services/User';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
    BarController
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,BarController
);

const WeightChart: React.FC = () => {
  const [weightEntries, setWeightEntries] = useState<{ date: string; weight: number }[]>([]);
  const token = localStorage.getItem('authToken') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getDayWeights(token);
        setWeightEntries(fetchedData); // Assuming fetchedData is an array of objects
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  // Map the weightEntries to the data expected by the chart
  const chartData = {
    labels: weightEntries.map(entry => entry.date), // Use the dates as labels
    datasets: [
      {
        label: 'Weight (kg)',
        data: weightEntries.map(entry => entry.weight), // Use the weights as data points
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false, // You may want to adjust this if you don't want the scale to start at zero
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="h-64">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeightChart;
