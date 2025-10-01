import React from 'react'
import { backendApi } from '../lib/utils'
import { useActionData, useLoaderData } from 'react-router';


export const leaderboardLoader = async ({async}) => {  

  try {
    const res = await backendApi('/auth/leaderboard'); 

    const leaderboardData = res.data.data

    console.log("Leadership",leaderboardData)

    return leaderboardData
    
  } catch (error) {
    throw Error(error.message)
  }
}

function Leaderboard() { 

  const leaderboardData = useLoaderData();  


 


  console.log("In component", leaderboardData)
  return (
    <div>
       <div className="mt-12 overflow-x-auto px-100">
        <table className="table-auto w-full border border-gray-300 text-left">
          <caption className="caption-top mb-2 font-medium">
            Leaderboard
          </caption>
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">First Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">Total Emissions</th>
              <th className="p-2">Rank</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map(({ firstName, lastName, totalEmissions, rank }, i) => (
              <tr key={i} className="even:bg-gray-50">
                <td className="p-2">{firstName}</td>
                <td className="p-2">{lastName}</td>
                <td className="p-2">{totalEmissions}</td>
                <td className="p-2">{rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
