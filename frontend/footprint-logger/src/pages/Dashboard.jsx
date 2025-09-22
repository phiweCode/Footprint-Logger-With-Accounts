import { dashboardContext, userContext } from "../context/context";
import axios from "axios";
import { useLoaderData } from "react-router";
import CategoryAnalysis from "../components/CategoryAnalysis";
import WeeklyContributions from "../components/WeeklyContributions";
import StatsCard from "../components/StatsCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import { backendApi } from "../lib/utils";

export const dashboardLoader = async ({ context }) => {
  //const { userId, token } = context.get(userContext);


    try {
      const res = await backendApi(
        "log/user_logs",
        {
          withCredentials: true,
        }
      );

      const dashboardData = await backendApi(
        "log/dashboard",
        {
          withCredentials: true,
        }
      );

      console.log("Dashboard data", dashboardData);

      const { stats, lastWeekActivities, activityTotalsPerCategory } =
        dashboardData.data.data;
     // context.set(dashboardContext, dashboardData.data.data);
      const { data } = res.data;

      const resultsObject = {
        data,
        stats,
        lastWeekActivities,
        activityTotalsPerCategory,
      };

      return {
        success: true,
        resultsObject,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data.message,
      };
    }
  

  return;
};

function Dashboard() {
  const loaderData = useLoaderData();

  const { data, stats, lastWeekActivities, activityTotalsPerCategory } =
    loaderData.resultsObject;
  console.log(
    "Data: ",
    data,
    "\n",
    "Stats: ",
    stats,
    "\n",
    "Last week's activities: ",
    lastWeekActivities,
    "\n",
    "Activities totals per Category: ",
    activityTotalsPerCategory[0],
    "\n"
  );

  return (
    <section className="dashboard grid grid-rows-auto gap-50 items-center justify-center h-full w-full pt-10 pb-50">
      <article className="quick-access grid grid-rows-auto h-full gap-5">
        <section className="grid grid-rows-2 justify-start w-full min-h-[15vh]">
          <h1 className="font-medium text-4xl">Your carbon footprint</h1>
          <p className="text-gray-400">
            Track your environmental impact and make a difference.{" "}
          </p>
        </section>

        <section className="stats grid grid-cols-3 gap-10.5 w-full">
          <article className="running-total">
            <StatsCard title="Total Emissions" value={stats.runningTotal} />
          </article>
          <article className="averageContribution">
            <StatsCard
              title="Total Average"
              value={stats.averageContribution}
            />
          </article>
          <article className="ratioAgainstCommunity">
            <StatsCard
              title="You Vs Community"
              value={stats.ratioAgainstCommunity}
            />
          </article>
        </section>

        <section className="visuals grid grid-cols-2 items-center justify-between w-full h-full gap-50">
          <article className="weekly-review h-full w-full flex flex-cols items-center justify-start max-w-[600px]">
            <WeeklyContributions data={lastWeekActivities} />
          </article>
          <article className="category-analysis h-full w-full flex flex-cols items-center float-end  max-w-[600px] justify-end">
            <CategoryAnalysis data={activityTotalsPerCategory} />
          </article>
        </section>
      </article>

      <table className="table-auto border-collapse border border-gray-400 p-24 mb-50 bg-blue-300">
        <caption class="caption-top">
          Table 3.1: Professional wrestlers and their signature moves.
        </caption>
        <thead className="min-h-[20vh]">
          <tr className="text-start">
            <th className="text-start">Category</th>
            <th className="text-start">Mode</th>
            <th className="text-start">quantity</th>
            <th className="text-start">Date</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((td) => {
              const { category, mode, estimatedContribution, createdAt } = td;
              return (
                <tr className="text-start">
                  <td>{category}</td>
                  <td>{mode}</td>
                  <td>{estimatedContribution}</td>
                  <td>{createdAt}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
}

export default Dashboard;
