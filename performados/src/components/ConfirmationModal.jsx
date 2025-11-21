import React from "react";

const WarningIcon = () => (
  <svg className="w-16 h-16 text-[#fca41d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-[#f6efe2] rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
        
        {/* Ícono */}
        <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full mb-4 bg-[#fca41d]/10">
          <WarningIcon />
        </div>

        {/* Título */}
        <h3 
          className="text-2xl font-bold text-center mb-2 text-[#2e5b61]"
          style={{ fontFamily: "Anton, sans-serif" }}
        >
          {title || "¿ESTÁS SEGURO?"}
        </h3>

        {/* Mensaje */}
        <p 
          className="text-center text-[#26484d] mb-6 text-lg leading-relaxed"
          style={{ fontFamily: "sora, sans-serif" }}
        >
          {message || "Esta acción no se puede deshacer."}
        </p>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg font-bold text-[#2e5b61] border-2 border-[#2e5b61] hover:bg-[#2e5b61]/10 transition-colors"
            style={{ fontFamily: "sora, sans-serif" }}
          >
            Cancelar
          </button>
          
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-lg font-bold text-white bg-[#fb2c35] hover:bg-[#d91b23] transition-colors shadow-md"
            style={{ fontFamily: "sora, sans-serif" }}
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}