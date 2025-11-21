import React from "react";

const SuccessIcon = () => (
  <svg className="w-16 h-16 text-[#2e5b61]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-16 h-16 text-[#fb2c35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function FeedbackModal({ isOpen, onClose, type = "success", message }) {
  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-[#f6efe2] rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
        
        <div className={`mx-auto flex items-center justify-center w-20 h-20 rounded-full mb-4 ${isSuccess ? 'bg-[#2e5b61]/10' : 'bg-[#fb2c35]/10'}`}>
          {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
        </div>

        <h3 
          className="text-2xl font-bold text-center mb-2"
          style={{ fontFamily: "Anton, sans-serif", color: isSuccess ? "#2e5b61" : "#fb2c35" }}
        >
          {isSuccess ? "¡LISTO!" : "¡UPS!"}
        </h3>

        <p 
          className="text-center text-[#26484d] mb-6 text-lg leading-relaxed"
          style={{ fontFamily: "sora, sans-serif" }}
        >
          {message}
        </p>

        <button
          onClick={onClose}
          className={`w-full py-3 rounded-lg font-bold text-white transition-transform active:scale-95 hover:shadow-lg ${
            isSuccess 
              ? "bg-[#2e5b61] hover:bg-[#1e3d41]" 
              : "bg-[#fb2c35] hover:bg-[#d91b23]"
          }`}
          style={{ fontFamily: "sora, sans-serif" }}
        >
          Entendido
        </button>
      </div>
    </div>
  );
}