import React from "react";
import { FaPlus } from "react-icons/fa";

function ProductButton({ setterCreateProductModalOpen, isLogged }) {
  return (
    <>
      {isLogged && (
        <div className="fixed bottom-20 right-5 z-50">
          <button
            onClick={() => setterCreateProductModalOpen((prev) => !prev)}
            className="bg-[#2f5b61] text-white p-2 rounded-full shadow-lg hover:bg-[#507f79] transition-colors duration-300 hover:cursor-pointer"
            aria-label="Agregar nuevo producto" 
          >
            <FaPlus className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 hover:scale-120 transition-transform duration-300" />
          </button>
        </div>
      )}
    </>
  );
}

export default ProductButton;