import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedbackModal from "../components/FeedbackModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import CreateReviewModal from "../components/CreateReviewModal";
import Seller from "./Seller";
const URL_API = import.meta.env.VITE_API_URL;
import EditReviewModal from "../components/EditReviewModal";

const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const colorThemes = {
  pink: "bg-[#fd538d]",
  white: "bg-[#ece2cc]",
  green: "bg-[#839243]",
  gray: "bg-[#7f7d7e]",
  blue: "bg-[#8467bb]",
  black: "bg-[#535152]",
  brown: "bg-[#a07348]",
  default: "bg-[#2f5b61]",
};

const colorOptions = [
  { value: "pink", label: "Rosado" },
  { value: "white", label: "Blanco" },
  { value: "green", label: "Verde" },
  { value: "gray", label: "Gris" },
  { value: "blue", label: "Azul" },
  { value: "black", label: "Negro" },
  { value: "brown", label: "Café" },
  { value: "default", label: "Otro" },
];

function Product({
  id,
  OwnerId,
  condition,
  image,
  description,
  name,
  price,
  color,
  stock,
  setIsProductOpen,
  setCartList,
  setterCartOpen,
  cartList,
  openEditModal,
}) {
  const isInCart = cartList.some((item) => item.id === id);
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const isOwner = currentUser && currentUser.id === OwnerId;
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [sellerModalOpen, setSellerModalOpen] = useState(false);
  const [editReviewModalOpen, setEditReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "success",
    message: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);

  // Función helper para verificar color
  const verifyColor = (colorName) => {
    return colorThemes[colorName] ? colorName : "default";
  };

  // Mostrar modal Seller
  const handleShowSeller = () => {
    setSellerModalOpen(true);
  };

  // --- LÓGICA DE RESEÑAS ---
  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${URL_API}/productreviews/product/${id}`
      );
      if (response.status !== 200) {
        throw new Error("Error al obtener las reseñas del producto");
      }
      setReviews(response.data);
    } catch (error) {
      console.error("Error al obtener las reseñas:", error);
    }
  };

  // --- LÓGICA DEL CARRITO ---
  const addToCart = async (productId) => {
    if (!currentUser) {
      setFeedback({
        isOpen: true,
        type: "error",
        message: "Debes iniciar sesión para comprar.",
      });
      return;
    }
    try {
      await axios.post(`${URL_API}/cart/products/${productId}`, {
        userId: currentUser.id,
        quantity: 1,
      });
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      setFeedback({
        isOpen: true,
        type: "error",
        message: "No se pudo añadir al carrito.",
      });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta reseña?")) return;
    try {
      await axios.delete(`${URL_API}/productreviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      setFeedback({
        isOpen: true,
        type: "success",
        message: "Reseña eliminada exitosamente.",
      });
    } catch (error) {
      setFeedback({
        isOpen: true,
        type: "error",
        message:
          error.response?.data?.message || "No se pudo eliminar la reseña.",
      });
    }
  };

  const handleAddToCart = () => {
    if (stock <= 0) {
      setFeedback({
        isOpen: true,
        type: "info",
        message: "Producto agotado.",
      });
      return;
    }
    if (!currentUser) {
      setFeedback({
        isOpen: true,
        type: "info",
        message: "Inicia sesión para comprar.",
      });
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    addToCart(id);
    setCartList((prevCart) => {
      const productToAdd = {
        id,
        name,
        price,
        image,
        color,
        quantity: 1,
        stock: stock,
      };
      return [...prevCart, productToAdd];
    });
    setIsProductOpen(false);
    setterCartOpen(true);
  };

  const handleViewCart = () => {
    setIsProductOpen(false);
    setterCartOpen(true);
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    setShowConfirm(false);
    try {
      const deleteUrl = `${URL_API}/products/${id}`;
      await axios.delete(deleteUrl);

      setFeedback({
        isOpen: true,
        type: "success",
        message: "¡Producto eliminado correctamente!",
      });
    } catch (error) {
      console.error("Error al eliminar:", error);
      const errorMsg = error.response?.data?.error || "Error de conexión";
      setFeedback({
        isOpen: true,
        type: "error",
        message: `No se pudo eliminar: ${errorMsg}`,
      });
    }
  };

  const handleFeedbackClose = () => {
    setFeedback({ ...feedback, isOpen: false });
    if (feedback.type === "success" && feedback.message.includes("eliminado")) {
      setIsProductOpen(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 ${
          colorThemes[verifyColor(color)]
        } flex items-center justify-center z-50 p-4`}
      >
        {reviewModalOpen && (
          <CreateReviewModal
            ModalOpen={reviewModalOpen}
            onClose={() => {
              setReviewModalOpen(false);
              window.location.reload();
            }}
            productId={id}
            currentUser={currentUser}
            productName={name}
          />
        )}
        <div className="bg-[#f6efe2] rounded shadow-2xl max-w-[85%] w-full relative grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto md:mt-20">
          <button
            className="absolute top-4 right-4 text-[#2e5b61] hover:text-[#1a3a3e] z-10 hover:cursor-pointer"
            onClick={() => setIsProductOpen(false)}
          >
            <CloseIcon />
          </button>
          <div
            className="p-8 mt-8 md:p-8 flex-col items-center justify-center"
            style={{ fontFamily: "sora, sans-serif" }}
          >
            <img
              src={image === null ? "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" : image}
              alt={name}
              className="w-full h-auto max-h-[45vh] object-contain rounded-md"
            />
            <div
              className="Reviews"
              style={{
                maxHeight: "150px",
                overflowY: "auto",
                marginTop: "1rem",
              }}
            >
              <h3 className="text-lg font-semibold text-[#2e5b61] mt-4 mb-2">
                Reseñas del Producto
              </h3>
              {reviews.length === 0 ? (
                <p className="text-gray-600">
                  No hay reseñas para este producto.
                </p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-300 rounded p-4 mb-4 bg-[#f2eadd]"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-[#26484d]">
                        {review.title}
                      </h4>
                      <h4 className="font-normal text-[#26484d] text-right ">
                        By:{" "}
                        {review.user.id === currentUser?.id
                          ? "You"
                          : review.user.name}
                      </h4>
                    </div>
                    <p className="text-yellow-500">
                      {"★".repeat(review.stars)}
                      {"☆".repeat(5 - review.stars)}
                    </p>
                    <p className="text-gray-700">{review.body}</p>
                    {(review.user.id === currentUser?.id || currentUser?.id === 1) && (
                      <div>
                        <button
                          className="mt-2 px-3 mr-1 py-1 bg-[#9362bb] text-white rounded hover:bg-[#d91b23] text-sm"
                          onClick={() => {
                            setSelectedReview(review);
                            setEditReviewModalOpen(true);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="mt-2 px-3 py-1 bg-[#fb2c35] text-white rounded hover:bg-[#d91b23] text-sm"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          <div
            className="p-4 md:p-8 flex flex-col justify-center"
            style={{ fontFamily: "sora, sans-serif" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#2e5b61] mb-2">
              {name}
            </h2>
            <p className="text-xl md:text-2xl font-semibold text-[#26484d] mb-4">
              ${price}
            </p>
            <p
              className="text-l md:text-xl font-semibold text-[#9362bb] mb-4 hover:underline hover:cursor-pointer"
              onClick={handleShowSeller}
              style={{ cursor: "pointer" }}
            >
              Visitar perfil del vendedor
            </p>

            <p className="text-base text-gray-700 mb-6">
              Descripcion: {description}
            </p>
            <div className="border-t border-[#d3c9b6] pt-4 mb-6 space-y-2">
              <p className="text-sm text-gray-800">
                <strong className="font-semibold text-gray-900">
                  Condición:
                </strong>{" "}
                {condition}
              </p>
              <p className="text-sm text-gray-800">
                <strong className="font-semibold text-gray-900">Color:</strong>{" "}
                {colorOptions.find((c) => c.value === verifyColor(color))
                  ? colorOptions.find((c) => c.value === verifyColor(color))
                      .label
                  : "Otro"}
              </p>
              <p className="text-sm text-gray-800">
                <strong className="font-semibold text-gray-900">Stock:</strong>{" "}
                {stock}
              </p>
            </div>
            {isOwner ? (
              <>
                <button
                  onClick={openEditModal}
                  className="w-full bg-[#8467bb] text-[#f6efe2] mt-2 py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e5b61] focus:ring-offset-[#f6efe2] hover:cursor-pointer"
                >
                  Editar Producto
                </button>
                <button
                  onClick={handleDeleteClick} // Corregido: usa el modal, no borra directo
                  className="w-full bg-[#fb2c35] text-[#f6efe2] mt-2 py-3 rounded-lg font-semibold hover:bg-[#d91b23] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e5b61] focus:ring-offset-[#f6efe2] hover:cursor-pointer"
                >
                  Eliminar Producto
                </button>
              </>
            ) : isInCart ? (
              <button
                onClick={handleViewCart} // Corregido: Tu código tenía openEditModal aquí por error
                className="w-full bg-[#8467bb] text-[#f6efe2] mt-2 py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e5b61] focus:ring-offset-[#f6efe2] hover:cursor-pointer"
              >
                Ver en el Carrito
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#8467bb] text-[#f6efe2] mt-2 py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e5b61] focus:ring-offset-[#f6efe2] hover:cursor-pointer"
              >
                {!currentUser
                  ? "Inicia sesión para comprar"
                  : stock <= 0
                  ? "Producto agotado"
                  : "Añadir al Carrito"}
              </button>
            )}

            {!isOwner && currentUser && (
              <button
                onClick={() => setReviewModalOpen(true)}
                className="w-full bg-[#027f47] text-[#f6efe2] mt-2 py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e5b61] focus:ring-offset-[#f6efe2] hover:cursor-pointer"
              >
                Dejar una Reseña
              </button>
            )}

            <button
              onClick={() => {
                setIsProductOpen(false);
              }}
              className="w-full bg-[#2e5b61] text-[#f6efe2] mt-2 py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e5b61] focus:ring-offset-[#f6efe2] hover:cursor-pointer"
            >
              Volver a la Tienda ⏎
            </button>
          </div>
        </div>
      </div>

      {sellerModalOpen && (
        <Seller sellerId={OwnerId} setIsSellerOpen={setSellerModalOpen} />
      )}

      {editReviewModalOpen && selectedReview && (
        <EditReviewModal
          ModalOpen={editReviewModalOpen}
          onClose={() => setEditReviewModalOpen(false)}
          review={selectedReview}
          reviewType="product"
        />
      )}

      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="¿ELIMINAR PRODUCTO?"
        message="¿Estás seguro de que quieres borrar este producto? Esta acción no se puede deshacer."
      />

      <FeedbackModal
        isOpen={feedback.isOpen}
        type={feedback.type}
        message={feedback.message}
        onClose={handleFeedbackClose}
      />
    </>
  );
}
export default Product;
