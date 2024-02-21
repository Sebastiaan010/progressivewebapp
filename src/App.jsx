import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import ProjectDetailsPage from "./components/ProjectDetailsPage";
import "./App.css";

export default function App() {
  
  return (
    <div>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/details/:projectId" component={ProjectDetailsPage} />
      </Routes>
    </div>
  );
}


