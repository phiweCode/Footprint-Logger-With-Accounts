import { Outlet, useLoaderData } from "react-router"
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"; 
import {isLoggedIn} from "./context/context";

export const appLoader = async ({context}) => {  

  const session = context.get(isLoggedIn)
  console.log("Context from app: ", session)
  return context.get(isLoggedIn)
}

export const appAction = async ({request, context}) => { 
  context.set(isLoggedIn, {session: false})
}

function App() {  
  const isLoggedIn = useLoaderData()
  console.log(isLoggedIn.session, "session")
  return (
    <>
      <section className="h-screen overflow-auto">
      <NavBar isLoggedIn={isLoggedIn.session} />
      <Outlet /> 
      </section>
      <Footer />
    </>
  )
}

export default App; 
