import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function CreateReviewModal({
  ModalOpen,
  onClose,
  productId,
  currentUser,
  productName,
}) {
  const [stars, setStars] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const createReview = async () => {
    if (!title.trim() || !body.trim()) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    try {
      const response = await axios.post(`${URL_API}/productreviews/`, {
        reviewedProductId: productId,
        userId: currentUser.id,
        title,
        stars,
        body,
      });
      console.log("Reseña creada:", response.data);
      onClose();
    } catch (error) {
      console.error("Error al crear la reseña:", error);
    }
  };

  return (
    <>
      {ModalOpen && (
        <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Crear Reseña para: {productName}
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
      )}
    </>
  );
}

export default CreateReviewModal;
