import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import LandingPage from "./pages/Landing";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {" "}
        {/* Cambié bg-base-100 por uno de Tailwind */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Si quieres otras rutas, agrégalas aquí: */}
          <Route
            path="/about"
            element={
              <div className="p-4">
                <h1 className="text-2xl font-bold">About</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
