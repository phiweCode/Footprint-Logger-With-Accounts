import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
      position: "top",
    },
    title: {
      display: true,
      text: "Weekly Activity Contribution",
    },
  },
  scales: {
    x: {grid: {display: false}},
    y: {grid: {display: false}},
  },
};

function WeeklyContributions({ ...props }) {
  const { data = []} = props ?? {};
  // console.log("Weekly", data.map(dat))
  const labels = data.map((dates) => dates._id);
  const chartConfigs = {
    labels,
    datasets: [
      {
        label: "Daily contribtion in kg CO2",
        data: data.map((qty) => qty.totalQuantity),
        backgroundColor: "rgb(18, 65, 112)",
      },
    ],
  };

  return <Bar options={options} data={chartConfigs} />;
}

export default WeeklyContributions;
