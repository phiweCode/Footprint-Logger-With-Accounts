import { dashboardContext, userContext } from "../context/context";
import axios from "axios";
import { useLoaderData } from "react-router";
import CategoryAnalysis from "../components/CategoryAnalysis";
import WeeklyContributions from "../components/WeeklyContributions";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const dashboardLoader = async ({ context }) => {
  const { userId, token } = context.get(userContext);

  if (userId && token) {
    try {
      const res = await axios.post(
        `${BACKEND_URL}log/user_logs`,
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        }
      ); 
      
      const dashboardData = await axios.post(`${BACKEND_URL}log/dashboard`, {userId}, { 
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": "Bearer " + token
        },
         withCredentials: true 
      }) 

      console.log("Dashboard data", dashboardData); 

      const { stats, lastWeekActivities, activityTotalsPerCategory } = dashboardData.data.data; 
       context.set(dashboardContext, dashboardData.data.data); 
      const { data }= res.data;

      const resultsObject  = { 
        data, 
        stats, 
        lastWeekActivities, 
        activityTotalsPerCategory
      }

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
  }

  return;
};

function Dashboard() {
  const loaderData = useLoaderData();
  
  const { data, stats, lastWeekActivities, activityTotalsPerCategory } = loaderData.resultsObject; 
  console.log("Data: ", data, "\n", "Stats: ",stats , "\n", "Last week's activities: ", lastWeekActivities, "\n", "Activities totals per Category: ", activityTotalsPerCategory[0], "\n")

  return (
    <section className="dashboard flex flex-col items-center justify-center h-full pt-40"> 
          <section className="stats grid grid-cols-3 gap-2.5">
                <article className="running-total"> 
                  {stats.runningTotal}
                </article> 
                <article className="averageContribution"> 
                  {stats.averageContribution}
                </article>
                <article className="ratioAgainstCommunity">
                  {stats.ratioAgainstCommunity}
                </article>
          </section> 
          <section className="visuals grid grid-cols-2 items-center justify-center">
            <article className="weekly-review">
                <WeeklyContributions data={lastWeekActivities} />
            </article>
            <article className="category-analysis"> 
              <CategoryAnalysis data={activityTotalsPerCategory} />
            </article>
          </section>
          <table> 
            <tr className="text-center grid grid-cols-4">
            <th>Category</th>
            <th>Mode</th>
            <th>quantity</th>
            <th>Date</th>
            </tr> 
   
              {data && data.map(td=>{ 
                const { category, mode, estimatedContribution, createdAt } = td
                return (<tr className="text-center grid grid-cols-4">
                  <td>{category}</td>
                  <td>{mode}</td>
                  <td>{estimatedContribution}</td>
                  <td>{createdAt}</td>
                </tr>)
              })}

          </table>
    </section>
  );
}

export default Dashboard;
