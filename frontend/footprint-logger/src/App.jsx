import { Outlet, RouterProvider } from "react-router"
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"; 

function App() {
  return (
    <>
      <section className="h-screen overflow-auto">
      <NavBar />
      <Outlet /> 
      </section>
      <Footer />
    </>
  )
}

export default App; 
