import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  

function NavBar() {

      const navigate = useNavigate()
      const handleSubmit = async () => {
        try {
          const res = await axios.post(`${BACKEND_URL}auth/sign_out`, null, { withCredentials: true }); 
          console.log("From logout",res)
          navigate('/sign_in');
        } catch (err) {
          console.error(err);
        }
      };

  return (
    <nav className="sticky top-0 grid grid-cols-3 justify-between items-center bg-blue-900 text-white font-blank  w-full p-5">
      {/**Logo */}
      <div className="logo">
        <h1>Footprint Logger</h1>
      </div>

      {/** links */}
      <ul className="links flex justify-between">
        <NavLink to='/activities'>
          <li className="links">Activities</li>
        </NavLink>
        <NavLink  to='/dashboard' >
          <li className="links">Dashboard</li>
        </NavLink>
        <NavLink  to='/reports' >
          <li className="links">Reports</li>
        </NavLink>
        <NavLink  to='/leaderboard' >
          <li className="links">Leaderboard</li>
        </NavLink>
      </ul>

      {/**Utils */}
      <div className="utils flex justify-end">
        <NavLink to='/sign_in'
          className="bg-white text-black min-w-20 rounded-15 text-center font-black"
        >
          Login
        </NavLink> 
        <button className="bg-white text-black font-black ml-5 px-2" onClick={handleSubmit}>
          Sign out
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
