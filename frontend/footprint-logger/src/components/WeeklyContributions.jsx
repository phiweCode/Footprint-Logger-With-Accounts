import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { da } from 'zod/v4/locales';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Weekly Activity Contribution',
    },
  },
};



// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

function WeeklyContributions({...props}) { 
    const {data} = props; 
    // console.log("Weekly", data.map(dat))
    const labels = data.map(dates=> dates._id);
    const chartConfigs = {
            labels,
            datasets: [
                {
                label: 'Daily contribtion in kg CO2',
                data: data.map((qty) => qty.totalQuantity),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }]}

  return <Bar options={options} data={chartConfigs} />

  
}

export default WeeklyContributions
