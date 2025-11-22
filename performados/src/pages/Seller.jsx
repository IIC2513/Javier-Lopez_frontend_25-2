import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedbackModal from "../components/FeedbackModal";
import CreateUserReviewModal from "../components/CreateUserReviewModal";
import { useNavigate } from "react-router-dom";
import EditReviewModal from "../components/EditReviewModal";

const URL_API = import.meta.env.VITE_API_URL;

function Seller({ sellerId, setIsSellerOpen }) {
  const [seller, setSeller] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "success",
    message: "",
  });
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const [editReviewModalOpen, setEditReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchSellerInfo = async () => {
    try {
      const response = await axios.get(`${URL_API}/users/${sellerId}`);
      setSeller(response.data);
    } catch (error) {
      setFeedback({
        isOpen: true,
        type: "error",
        message: "No se pudo obtener la información del vendedor.",
      });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta reseña?")) return;
    try {
      await axios.delete(`${URL_API}/userreviews/${reviewId}`);
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

  const fetchSellerReviews = async () => {
    try {
      const response = await axios.get(
        `${URL_API}/userreviews/user/reviewed/${sellerId}`
      );
      setReviews(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setFeedback({
        isOpen: true,
        type: "error",
        message: "No se pudieron obtener las reseñas del vendedor.",
      });
    }
  };

  const [saleIdForReview, setSaleIdForReview] = useState(null);

  useEffect(() => {
    fetchSellerInfo();
    fetchSellerReviews();
    fetchUserSales();
  }, [sellerId]);

  const fetchUserSales = async () => {
    if (!currentUser) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.get(
        `${URL_API}/sales/user/${currentUser.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const sales = response.data;
      for (const sale of sales) {
        const items = sale.orderItems || sale.items || [];
        for (const item of items) {
          const prodInfo = item.Product || item.product || item;
          if (prodInfo.ownerId === sellerId) {
            setSaleIdForReview(sale.id);
            return;
          }
        }
      }
      setSaleIdForReview(null);
    } catch (error) {
      setSaleIdForReview(null);
    }
  };

  const handleFeedbackClose = () => {
    setFeedback({ ...feedback, isOpen: false });
  };

  return (
    <div
      className="fixed inset-0 bg-[#2e5b61] flex items-center justify-center z-50 p-4"
      style={{ fontFamily: "sora, sans-serif" }}
    >
      {reviewModalOpen && (
        <CreateUserReviewModal
          ModalOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          currentUser={currentUser}
          reviewedUserId={sellerId}
          reviewedName={seller?.name || "Vendedor"}
          saleId={saleIdForReview} // TODO: BUSCAR LA VENTA
        />
      )}
      <div className="bg-[#f6efe2] rounded shadow-2xl max-w-[85%] w-full relative grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto md:mt-20">
        <button
          className="absolute top-4 right-4 text-[#2e5b61] hover:text-[#1a3a3e] z-10 hover:cursor-pointer"
          onClick={() => setIsSellerOpen(false)}
        >
          Cerrar
        </button>
        <div className="p-8 mt-8 md:p-8 flex-col items-center justify-center">
          {seller ? (
            <>
              <img
                src={
                  seller.image ||
                  "https://ui-avatars.com/api/?name=" + seller.name
                }
                alt={seller.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-[#2e5b61] mb-2 text-center">
                {seller.name}
              </h2>
              <p className="text-base text-gray-700 mb-2 text-center">
                {seller.email}
              </p>
              <p className="text-base text-gray-700 mb-6 text-center">
                {seller.description || "Sin descripción"}
              </p>
              {saleIdForReview ? (
                <button
                  className="w-full bg-[#2e5b61] text-[#f6efe2] mt-2 py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors"
                  onClick={() => setReviewModalOpen(true)}
                >
                  Reseña al Vendedor
                </button>
              ) : (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Debes haber comprado a este vendedor para dejar una reseña.
                </p>
              )}
              <button
                className="w-full bg-[#9362bb] text-[#f6efe2] mt-2 py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors"
                onClick={() => {
                  navigate("/products");
                  setIsSellerOpen(false);
                }}
              >
                Volver a la tienda
              </button>
            </>
          ) : (
            <p className="text-gray-600">
              Cargando información del vendedor...
            </p>
          )}
        </div>
        <div className="p-4 md:p-8 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-[#2e5b61] mt-4 mb-2">
            Reseñas del Vendedor
          </h3>
          <div
            style={{ maxHeight: "250px", overflowY: "auto", marginTop: "1rem" }}
          >
            {reviews.length === 0 ? (
              <p className="text-gray-600">
                No hay reseñas para este vendedor.
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-300 rounded p-4 mb-4 bg-[#ede6da]"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-[#26484d]">
                      {review.title}
                    </h4>
                    <h4 className="font-normal text-[#26484d] text-right">
                      By: {review.author?.name || "Desconocido"}
                    </h4>
                  </div>
                  <p className="text-yellow-500">
                    {"★".repeat(review.stars)}
                    {"☆".repeat(5 - review.stars)}
                  </p>
                  <p className="text-gray-700">{review.body}</p>
                  {review.author?.id === currentUser?.id && (
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
      </div>
      {editReviewModalOpen && selectedReview && (
        <EditReviewModal
          ModalOpen={editReviewModalOpen}
          onClose={() => setEditReviewModalOpen(false)}
          review={selectedReview}
          reviewType="user"
        />
      )}
      <FeedbackModal
        isOpen={feedback.isOpen}
        type={feedback.type}
        message={feedback.message}
        onClose={handleFeedbackClose}
      />
    </div>
  );
}

export default Seller;
