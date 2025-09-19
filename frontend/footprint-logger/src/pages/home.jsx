import React from 'react'; 
import { Outlet } from 'react-router';

export const homeLoader = async ({context}) => { 
  return
}

function Home() {
  return (
    <div>
      <h1>Hello world!</h1>
        <Outlet />
    </div>
  )
}

export default Home
