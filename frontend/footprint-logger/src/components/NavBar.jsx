import { NavLink, useNavigate } from "react-router";
import logo from "./carbon_footprint_logo.png";
import { backendApi } from "../lib/utils";
import Profile from "../pages/profile";
import {useState} from 'react'


function NavBar({ ...props }) {
  const { isLoggedIn, profileData } = props;
  const navigate = useNavigate();  

  const [showProfileMenu, setShowProfileMenu] = useState(false)

  console.log(isLoggedIn.session, "SESSION")

  const handleSubmit = async () => {
    try {
      await backendApi.post(`auth/sign_out`, null, {
        withCredentials: true,
      });
      backendApi.accessToken = null;

      navigate("/sign_in");
    } catch (err) {
      backendApi.accessToken = null;
    }
  };

  return (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <NavLink className="block text-teal-600" to="/">
                <span className="sr-only">Home</span>
                <img src={logo} className="w-10 h-auto" />
              </NavLink>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <NavLink
                      className="text-gray-500 transition hover:text-gray-500/75"
                      to="/"
                    >
                      Home{" "}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="text-gray-500 transition hover:text-gray-500/75"
                      to="/activities"
                    >
                      {" "}
                      Activities{" "}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="text-gray-500 transition hover:text-gray-500/75"
                      to="/dashboard"
                    >
                      Dashboard{" "}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="text-gray-500 transition hover:text-gray-500/75"
                      to="/reports"
                    >
                      Reports{" "}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="text-gray-500 transition hover:text-gray-500/75"
                      to="/leaderboard"
                    >
                      Leaderboard{" "}
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {
              isLoggedIn !== true ? (
                <div className="sm:flex sm:gap-4">
                  <NavLink
                    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                    to="/sign_in"
                  >
                    Login
                  </NavLink>

                  <div className="hidden sm:flex">
                    <NavLink
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                      to="/sign_up"
                    >
                      Register
                    </NavLink>
                  </div>
                </div>
              ) : (
                <div>
                  {/*Hamburger menu  */}
                  <div className="block md:hidden">
                    <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>

                {/* profile */}
                  <div className="hidden grid-rows-2 md:relative md:block">
                        
                   

                    <div className="grid grid-cols-3 items-center justify-between gap-2.5">
                    <p className="font-black  col-span-2"><h1>{profileData.firstName}</h1></p>
                    
                    <button
                      type="button"
                      onClick={()=>setShowProfileMenu(!showProfileMenu)}
          
                      className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                    >
                      <span className="sr-only">Toggle dashboard menu</span>
                 
                      <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="size-10 object-cover"
                      />
                    </button> 
                    </div>

                   {showProfileMenu && <div
                      className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                      role="menu" 
                      
                    >
                      <div className="p-2 flex items-center">
                        <NavLink
                          href="#"
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          role="menuitem"
                 
                        >
                          <Profile profileData={profileData}/> 
                        </NavLink> 
                        <NavLink to="/profile">{"-->"}</NavLink>
                      </div>

                      <div className="p-2">
                        <form onSubmit={handleSubmit}>
                          <button
                            type="submit"
                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                            role="menuitem"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="size-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                              />
                            </svg>
                            Logout
                          </button>
                        </form>
                      </div>
                    </div>}

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
