import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },

    tooltips: {
      position: 'nearest',
      mode: 'index',
      intersect: false,
      yPadding: 10,
      xPadding: 10,
      caretSize: 8,
      backgroundColor: 'rgba(72, 241, 12, 1)',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 4,
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function StatisticsChart() {
  const [chartData, setChartData] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    axios
      .get('http://localhost:5000/vn-pay/graph?page=1&limit=20', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const apiData = response.data;
        const data = {
          labels,
          datasets: [
            {
              label: 'Income',
              data: apiData.map((item) => item.total),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              fill: false,
            },
          ],
        };
        setChartData(data);
      })
      .catch((error) => {
        console.error('Error fetching chart data:', error);
      });
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return <Line options={options} data={chartData} />;
}
