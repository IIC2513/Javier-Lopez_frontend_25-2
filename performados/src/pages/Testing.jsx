import React, { useState } from "react"; // 1. Importa React y useState
import AnimatedContent from "../components/animacion";
import matcha from "../assets/matcha.png";
import FallingText from "../components/FallingText";
import { CreateProductModal } from "../components/CreateProductModal"; // 2. Importa tu nuevo modal

export default function Testing() {
  // 3. Añade el estado para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="w-screen h-screen bg-gray-900 text-black flex items-center justify-center" // Añadí flex para centrar el botón
    >
      {/* 4. Añade un botón para ABRIR el modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700"
        style={{ fontFamily: "sans-serif" }} // Usamos una fuente normal para el botón
      >
        Probar Modal de Producto
      </button>

      {/* 5. Renderiza el modal aquí.
           Se lo pasas al componente padre (Testing) para que sepa cómo cerrarse.
      */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}