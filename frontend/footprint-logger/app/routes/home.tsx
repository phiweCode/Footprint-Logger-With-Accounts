import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome"; 
import NavBar from "~/components/NavBar"; 
import { Outlet } from "react-router";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Footprint Logger" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return(
     <>
     <Outlet />
     </>
  )
}
