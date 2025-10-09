import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import LandingPage from "./pages/Landing";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {" "}
        {/* Cambié bg-base-100 por uno de Tailwind */}
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Agrega más rutas aquí cuando las crees */}
          <Route
            path="/caracteristicas"
            element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">Características</h1>
              </div>
            }
          />
          <Route
            path="/precios"
            element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">Precios</h1>
              </div>
            }
          />
          <Route
            path="/contacto"
            element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">Contacto</h1>
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
              </div>
            }
          />
          <Route
            path="/registro"
            element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">Registrarse</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
