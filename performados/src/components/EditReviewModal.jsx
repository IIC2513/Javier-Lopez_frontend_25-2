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
          <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 transition-opacity duration-300">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">
                Editar Reseña para:{" "}
                {review?.reviewedName ||
                  review?.productName ||
                  "Usuario/Producto"}
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
                  type="button"
                  onClick={handleEditReview}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={!title.trim() || !body.trim()}
                >
                  Guardar Cambios
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

export default EditReviewModal;
