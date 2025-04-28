import React, { useEffect } from "react";
import Home from "./pages/Home";
import {Router, Routes, useNavigate } from "react-router-dom";
import Allfeedback from "./pages/Allfeedback";
import BugReporst from "./pages/BugReporst";
import Suggestions from "./pages/Suggestions";
import SumbitnewFeedback from "./pages/SumbitnewFeedback";
import { Route } from "react-router-dom";
import ImportantFeedback from "./pages/ImportantFeedback";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/signup");
    }
  }, []);

  return(
    <div className="releative bg-gray-700 h-screen">
       
        <Routes>
          <Route path="/" element={<Home />} >
          <Route index element={<Allfeedback />} />
          <Route path="importantfeedback" element={<ImportantFeedback />} />
          <Route path="/bugreports" element={<BugReporst />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/sumbitnewfeedback" element={<SumbitnewFeedback />} />
          </Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
    </div>
  )
}

export default App;