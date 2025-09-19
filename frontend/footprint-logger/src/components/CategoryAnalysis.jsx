import { useState, useEffect, useRef } from "react";
import { buildAreaChart } from "../lib/utils";
import {
  Chart,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from 'react-chartjs-2'; 

Chart.register(ArcElement, RadialLinearScale, Tooltip, Legend);


function CategoryAnalysis({ ...props }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const { data } = props;
  const { details, grandTotal } = data[0];
  const chartConfigs = buildAreaChart(details);



const [config, setConfig] = useState({
  labels: chartConfigs[0].labels,
  datasets: chartConfigs[0].datasets,
  options: chartConfigs[0].options,
});
  return <PolarArea data={config} />;
}

export default CategoryAnalysis;
