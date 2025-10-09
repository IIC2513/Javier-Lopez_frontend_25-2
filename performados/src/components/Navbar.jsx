// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentSlide }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Colores dinámicos basados en el slide actual
  const navStyles = currentSlide
    ? {
        background: currentSlide.navColor?.includes("bg-white")
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        color: currentSlide.navColor?.includes("text-white")
          ? "white"
          : "gray.800",
      }
    : {};

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={navStyles}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
            <span
              className={`text-xl font-bold ${
                currentSlide?.navColor?.includes("text-white")
                  ? "text-white"
                  : "text-gray-800"
              }`}
            >
              Performados
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                currentSlide?.navColor?.includes("text-white")
                  ? "text-white/80 hover:text-white"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Inicio
            </Link>
            {/* ... otros enlaces ... */}

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className={`font-medium transition-colors ${
                  currentSlide?.navColor?.includes("text-white")
                    ? "text-white/80 hover:text-white"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/registro"
                className={`px-6 py-2 rounded-lg transition-colors font-medium ${
                  currentSlide?.navColor?.includes("text-white")
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Registrarse
              </Link>
            </div>
          </div>

          {/* Mobile menu button - se mantiene igual pero con colores dinámicos */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
