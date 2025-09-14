import React from 'react'
import { NavLink } from 'react-router'


function NavBar() {
  return (
    <nav className='bg-green-400 w-full h-auto grid grid-cols-6 items-center justify-between' > 

        <div className="logo bg-yellow-300 flex flex-col items-center"> 
            <img src="" alt="" />    Logo
        </div>  

        <ul className="navlinks bg-red-300 flex flex-4 justify-around col-span-4 px-[35%]">
           <NavLink to='/dashboard'>  
            <li className="navlink">Dashboard</li>
            </NavLink> 
           <NavLink to='/activities'>  
            <li className="navlink">Activities</li>
            </NavLink> 
           <NavLink to='/leaderboard'>  
            <li className="navlink">Reports</li>
            </NavLink> 
           <NavLink to='/'>  
            <li className="navlink">Settings</li>
            </NavLink> 

        </ul> 

        <div className="utils bg-orange-500 "> 
            <ul className="utilities flex flex-2 justify-around"> 
                <li className="notification">
                    Notifications
                </li>
                <li className="profile">
                    Profiles
                </li>
            </ul>
        </div>
      
    </nav>
  )
}

export default NavBar
