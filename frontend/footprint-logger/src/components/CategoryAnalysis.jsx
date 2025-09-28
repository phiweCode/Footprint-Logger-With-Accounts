import { useState, useMemo } from "react";
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

  const { data } = props;
  let details = null
  if(data && data.length !== 0) 
    {
      details  = data[0]?.details ?? [];
    }

 const chartConfigs = useMemo(() => buildAreaChart(details), [details, data]);


 
 console.log("configs", chartConfigs);
 console.log();

 const categories = chartConfigs.map(set=>set.datasets[0].label); 

  const [config, setConfig] = useState({
    labels: chartConfigs[0]?.labels,
    datasets: chartConfigs[0]?.datasets,
    options: chartConfigs[0]?.options,
  });

  const changeCategory = (index) => { 
    setConfig({
    labels: chartConfigs[index]?.labels,
    datasets: chartConfigs[index]?.datasets,
    options: chartConfigs[index]?.options,
    })
  }

return (<> 
  <article className="grid"> 
  {(chartConfigs?.length !== 0 ? <PolarArea data={config} /> : "Nothing to display yet")}
  <div className="grid grid-cols-3 gap-2.5 items-center justify-center text-center text-white">
  {categories.map((cat, i)=>{ 
    return <span className="bg-gray-600 px-1.5 rounded-2xl"  onClick={()=>changeCategory(i)}>{cat}</span>
  })}
  </div>
  </article>
  </>);
}

export default CategoryAnalysis;
