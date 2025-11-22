import React, { useState, useEffect } from "react";
import FeedbackModal from "./FeedbackModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function EditReviewModal({
  ModalOpen,
  onClose,
  review,
  reviewType = "user", // "user" o "product"
}) {
  const [stars, setStars] = useState(review?.stars || 5);
  const [title, setTitle] = useState(review?.title || "");
  const [body, setBody] = useState(review?.body || "");
  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "error",
    message: "",
  });

  useEffect(() => {
    setStars(review?.stars || 5);
    setTitle(review?.title || "");
    setBody(review?.body || "");
  }, [review]);

  const handleEditReview = async () => {
    if (!title.trim() || !body.trim()) {
      setFeedback({
        isOpen: true,
        type: "error",
        message: "Por favor, completa todos los campos obligatorios.",
      });
      return;
    }
    try {
      let response;
      if (reviewType === "product") {
        response = await axios.patch(`${URL_API}/productreviews/${review.id}`, {
          title,
          stars,
          body,
        });
      } else {
        response = await axios.put(`${URL_API}/userreviews/${review.id}`, {
          title,
          stars,
          body,
        });
      }
      setFeedback({
        isOpen: true,
        type: "success",
        message: "¡Reseña editada exitosamente!",
      });
    } catch (error) {
      let errorMsg = "Error al editar la reseña.";
      if (
        error.response &&
        error.response.data &&
        (error.response.data.message || error.response.data.error)
      ) {
        errorMsg = error.response.data.message || error.response.data.error;
      }
      setFeedback({
        isOpen: true,
        type: "error",
        message: errorMsg,
      });
      console.error("Error al editar la reseña:", errorMsg);
    }
  };

  return (
        <>
          {ModalOpen && (
            <>
              <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/40 backdrop-blur-sm p-2 md:p-6 transition-opacity duration-300">
                <div
                  className="relative w-full max-w-lg overflow-y-auto rounded-2xl bg-[#f6efe2] p-6 md:p-10 shadow-2xl transition-transform duration-300 border border-[#d3c9b6]"
                  style={{ fontFamily: "sora, sans-serif" }}
                >
                  <div className="flex items-start justify-between pb-4 border-b border-[#d3c9b6]">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#2e5b61]">
                      Editar Reseña para: <span className="font-semibold text-[#8467bb]">{review?.reviewedName || review?.productName || "Usuario/Producto"}</span>
                    </h2>
                    <button
                      onClick={onClose}
                      className="text-[#2e5b61] hover:text-[#fb2c35] transition-colors"
                      aria-label="Cerrar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEditReview();
                    }}
                    className="space-y-6 mt-2"
                  >
                    <div>
                      <label className="block text-base font-semibold text-[#26484d] mb-2">
                        Título
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full rounded-lg border border-[#d3c9b6] bg-[#f6efe2] px-4 py-2 shadow-sm focus:border-[#8467bb] focus:ring-[#8467bb] text-[#2e5b61]"
                        placeholder="Título de la reseña (Obligatorio)"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-base font-semibold text-[#26484d] mb-2">
                        Calificación
                      </label>
                      <select
                        value={stars}
                        onChange={(e) => setStars(parseInt(e.target.value))}
                        className="block w-full rounded-lg border border-[#d3c9b6] bg-[#f6efe2] px-4 py-2 shadow-sm focus:border-[#8467bb] focus:ring-[#8467bb] text-[#2e5b61]"
                        required
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-base font-semibold text-[#26484d] mb-2">
                        Comentario
                      </label>
                      <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="block w-full rounded-lg border border-[#d3c9b6] bg-[#f6efe2] px-4 py-2 shadow-sm focus:border-[#8467bb] focus:ring-[#8467bb] text-[#2e5b61]"
                        rows="3"
                        placeholder="Escribe tu reseña aquí (Obligatorio)"
                        required
                        style={{ minHeight: '48px', maxHeight: '80px' }}
                      ></textarea>
                    </div>
                    <div className="flex flex-col-reverse gap-4 mt-4 sm:flex-row sm:justify-center sm:gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="w-full justify-center rounded-lg border border-[#d3c9b6] bg-white px-4 py-3 text-base font-semibold text-[#2e5b61] shadow-sm hover:bg-[#ece2cc] sm:w-auto sm:text-sm transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={!title.trim() || !body.trim()}
                        className={`w-full justify-center rounded-lg border border-transparent px-4 py-3 text-base font-semibold text-white shadow-sm sm:w-auto sm:text-sm transition-colors ${!title.trim() || !body.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2e5b61] hover:bg-[#8467bb]'}`}
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <FeedbackModal
                isOpen={feedback.isOpen}
                type={feedback.type}
                message={feedback.message}
                onClose={() => {
                  setFeedback({ ...feedback, isOpen: false });
                  if (feedback.type === "success") {
                    onClose();
                  }
                }}
              />
            </>
          )}
        </>
      );
    }

export default EditReviewModal;
