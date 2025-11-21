import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedbackModal from "../components/FeedbackModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import CreateReviewModal from "../components/CreateReviewModal";
import Seller from "./Seller";
const URL_API = import.meta.env.VITE_API_URL;

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
  gray: "bg-[#fca41d]",
  blue: "bg-[#8467bb]",
  black: "bg-[#fca41d]",
  brown: "bg-[#a07348]",
  default: "bg-[#2f5b61]",
};

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

  const handleAddToCart = () => {
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
              navigate("/my-purchases");
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
              src={image}
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
                    className="border border-gray-300 rounded p-4 mb-4 bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-[#26484d]">
                        {review.title}
                      </h4>
                      <h4 className="font-normal text-[#26484d] text-right">
                        By:{" "}
                        {review.user.id === currentUser?.id
                          ? "You - press to edit..."
                          : review.user.name}
                      </h4>
                    </div>
                    <p className="text-yellow-500">
                      {"★".repeat(review.stars)}
                      {"☆".repeat(5 - review.stars)}
                    </p>
                    <p className="text-gray-700">{review.body}</p>
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
              Ver al vendedor: {OwnerId}
            </p>

            <p className="text-base text-gray-700 mb-6">{description}</p>
            <div className="border-t border-[#d3c9b6] pt-4 mb-6 space-y-2">
              <p className="text-sm text-gray-800">
                <strong className="font-semibold text-gray-900">
                  Condición:
                </strong>{" "}
                {condition}
              </p>
              <p className="text-sm text-gray-800">
                <strong className="font-semibold text-gray-900">Color:</strong>{" "}
                {color}
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
                {currentUser
                  ? "Añadir al Carrito"
                  : "Inicia sesión para comprar"}
              </button>
            )}

            {!isOwner && (
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
