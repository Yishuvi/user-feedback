import React from "react";
import Sidebar from "../components/Home/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-screen gap-4 w-full">
      <div className="bg-slate-500  w-1/6 rounded p-4 border-gray-400 flex flex-col justify-between">
       <Sidebar />
      </div>
        <div className="bg-slate-300 w-5/6 rounded p-4 border-gray-400">
         <Outlet />
        </div>
    </div>
  )
}

export default Home