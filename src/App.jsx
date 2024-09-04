import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import RoleExperience from "./pages/Roles/RoleExperience";
import MarketAnalysis from "./pages/market/MarketAnalysis";
import Inputs from "./pages/inputs/Inputs";
import MarketChallenges from "./pages/market/MarketChallenges";
import Register from "./pages/auth/Register";
import Training from "./pages/training/training";
import TrainingNeeds from "./pages/training/TrainingNeeds";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/dashboard" element={<HomeLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="roles-experience" element={<RoleExperience />} />
          <Route path="input-analysis" element={<Inputs />} />
          <Route path="training" element={<Training />} />
          <Route path="training-needs" element={<TrainingNeeds />} />
          <Route
            path="market-access-challenges"
            element={<MarketChallenges />}
          />
          <Route
            path="market-information-analysis"
            element={<MarketAnalysis />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
