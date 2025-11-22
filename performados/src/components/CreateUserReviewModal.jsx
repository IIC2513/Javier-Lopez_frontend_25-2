import React, { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function CreateUserReviewModal({
  ModalOpen,
  onClose,
  productId,
  currentUser,
  productName,
  saleId,
  reviewedName,
  reviewedUserId,
}) {
  const [stars, setStars] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "error",
    message: "",
  });
  const navigate = useNavigate();

  const createReview = async () => {
    if (!title.trim() || !body.trim()) {
      setFeedback({
        isOpen: true,
        type: "error",
        message: "Por favor, completa todos los campos obligatorios.",
      });
      return;
    }
    try {
      const response = await axios.post(`${URL_API}/userreviews/`, {
        saleId,
        reviewedUserId,
        userId: currentUser.id,
        title,
        stars,
        body,
      });
      console.log("Reseña creada:", response.data);
      setFeedback({
        isOpen: true,
        type: "success",
        message: "¡Reseña creada exitosamente!",
      });
    } catch (error) {
      let errorMsg = "Error al crear la reseña.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMsg = error.response.data.message;
      }
      setFeedback({
        isOpen: true,
        type: "error",
        message: errorMsg,
      });
      console.error("Error al crear la reseña:", errorMsg);
    }
  };

  return (
    <>
      {ModalOpen && (
        <>
          <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 transition-opacity duration-300">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">
                Crear Reseña para: {reviewedName}
              </h2>
              <label className="block mb-2">
                Título:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded mt-1 p-2"
                  placeholder="Título de la reseña (Obligatorio)"
                  required
                />
              </label>
              <label className="block mb-2">
                Calificación:
                <select
                  value={stars}
                  onChange={(e) => setStars(parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded mt-1 p-2"
                  required
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-4">
                Comentario:
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full border border-gray-300 rounded mt-1 p-2"
                  rows="4"
                  placeholder="Escribe tu reseña aquí (Obligatorio)"
                  required
                ></textarea>
              </label>
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  onClick={createReview}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={!title.trim() || !body.trim()}
                >
                  Enviar
                </button>
              </div>
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

export default CreateUserReviewModal;
