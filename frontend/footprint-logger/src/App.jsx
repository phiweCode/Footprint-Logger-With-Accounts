import { Outlet, useLoaderData } from "react-router"
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"; 
import {isLoggedIn, userContext} from "./context/context";

export const appLoader = async ({context}) => {  

  const session = context.get(isLoggedIn)
  console.log("Context from app: ", session) 
  
  if(session.session) { 
      const userData = context.get(userContext) || null;  
      return {isLoggedIn: context.get(isLoggedIn), profileData: userData}
  }

  

  return {isLoggedIn: context.get(isLoggedIn)}
}

export const appAction = async ({request, context}) => { 
  context.set(isLoggedIn, {session: false})
}

function App() {  
  const { isLoggedIn, profileData }= useLoaderData()
  console.log(isLoggedIn.session, "session")
  return (
    <>
      <section className="h-screen overflow-auto">
      <NavBar isLoggedIn={isLoggedIn.session} profileData={profileData}/>
      <Outlet /> 
      </section>
      <Footer />
    </>
  )
}

export default App; 
