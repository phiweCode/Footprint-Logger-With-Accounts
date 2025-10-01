import { useLoaderData } from "react-router";
import CategoryAnalysis from "../components/CategoryAnalysis";
import WeeklyContributions from "../components/WeeklyContributions";
import StatsCard from "../components/StatsCard";

import { backendApi } from "../lib/utils";

export const dashboardLoader = async ({ context }) => {
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

      const { stats, lastWeekActivities, activityTotalsPerCategory } = dashboardData.data.data;
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
};

function Dashboard() {
  const loaderData = useLoaderData();

  const { data = [], stats, lastWeekActivities, activityTotalsPerCategory } = loaderData.resultsObject ?? {};

  return (
    <section className="dashboard w-full min-h-screen md:p-10 mt-25">
      <article className="quick-access space-y-10 px-75">
        {/* header */}
        <header className="space-y-2">
          <h1 className="font-medium text-3xl md:text-4xl">
            Your carbon footprint
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Track your environmental impact and make a difference.
          </p>
        </header>

        {/* stats cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 ">
          <StatsCard title="Total Emissions" value={stats?.runningTotal} />
          <StatsCard title="Total Average" value={stats?.averageContribution} />
          <StatsCard title="You Vs Community" value={stats?.ratioAgainstCommunity} />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-60">
          <article className="weekly-review h-full w-full flex flex-cols items-center justify-start max-w-[400px]">
            <WeeklyContributions data={lastWeekActivities} />
          </article>
          <article className="category-analysis h-full w-full flex flex-cols items-center float-end  max-w-[400px] justify-end">
            <CategoryAnalysis data={activityTotalsPerCategory} />
          </article>
        </section>
      </article>

       {/* table */}
      <div className="mt-12 overflow-x-auto px-100">
        <table className="table-auto w-full border border-gray-300 text-left">
          <caption className="caption-top mb-2 font-medium">
            Table 3.1: Professional wrestlers and their signature moves.
          </caption>
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Category</th>
              <th className="p-2">Mode</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ category, mode, estimatedContribution, createdAt }, i) => (
              <tr key={i} className="even:bg-gray-50">
                <td className="p-2">{category}</td>
                <td className="p-2">{mode}</td>
                <td className="p-2">{estimatedContribution}</td>
                <td className="p-2">{createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Dashboard;
