import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateReviewModal from "../components/CreateReviewModal";
import Products from "./Products";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function Summary() {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [productsToReview, setProductsToReview] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const navigate = useNavigate();
  const [cartList, setCartList] = useState(() => {
    try {
      const storedCart = localStorage.getItem("shoppingCart");
      console.log(storedCart);
      console.log("Stored Cart:", JSON.parse(storedCart));
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error al leer el carrito de localStorage", error);
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const totalPrice = () => {
    const total = cartList.reduce(
      (acc, item) =>
        acc + item.price * (item.CartItem?.quantity ?? item.quantity ?? 1),
      0
    );
    return total.toLocaleString("es-CL") + " CLP";
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    //alert("¡Compra realizada con éxito! (Simulación)");
    const data = await handleBuy();
    if (data) {
      cleanCart();
      setProductsToReview(cartList);
      setCurrentReviewIndex(0);
      setReviewModalOpen(true);
    }
  };

  const cleanCart = async () => {
    try {
      setCartList([]);
      localStorage.removeItem("shoppingCart");
      const response = await axios.delete(
        `${URL_API}/cart/users/${currentUser.id}`
      );
      console.log("Carrito limpiado:", response.data);
    } catch (error) {
      console.error("Error al limpiar el carrito:", error);
    }
  };

  const handleBuy = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Por favor, inicia sesion para completar la compra.");
        return;
      }
      const response = await fetch(`${URL_API}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clientId: currentUser.id,
          items: cartList.map((item) => ({
            productId: item.id,
            quantity: item.CartItem?.quantity ?? item.quantity ?? 1,
          })),
        }),
      });

      if (response.status === 401) {
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        setCurrentUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        navigate("/login");
        window.location.reload();
        return null;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error creando la venta");
      }

      const data = await response.json();
      console.log(">>> Order created successfully:", data);
      //alert("¡¡¡Compra realizada con exito!!!");
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error al procesar la compra. Por favor, intentalo de nuevo.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center py-45"
      style={{ background: "#2f5b61" }}
    >
      {reviewModalOpen && productsToReview.length > 0 && (
        <CreateReviewModal
          productName={productsToReview[currentReviewIndex]?.name}
          ModalOpen={reviewModalOpen}
          productId={productsToReview[currentReviewIndex]?.id}
          currentUser={currentUser}
          onClose={() => {
            //console.log("Products to Review:", productsToReview);
            //console.log("Current Review Index:", currentReviewIndex);
            if (currentReviewIndex < productsToReview.length - 1) {
              setCurrentReviewIndex(currentReviewIndex + 1);
            } else {
              setReviewModalOpen(false);
              setProductsToReview([]);
              setCurrentReviewIndex(0);
              navigate("/my-profile");
              window.location.reload();
            }
          }}
        />
      )}
      <div
        className="w-[90%] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#f6efe2] rounded-lg shadow-lg p-8"
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 91, 97, 0.2)" }}
      >
        <div className="flex flex-col justify-center">
          <h2
            className="text-2xl font-bold text-[#2e5b61] mb-6"
            style={{ fontFamily: "sora, sans-serif" }}
          >
            Finalizar Compra
          </h2>

          <form onSubmit={handleCheckout} className="space-y-6">
            <div>
              <h3
                className="text-lg font-semibold text-[#2e5b61] mb-3 border-b pb-2"
                style={{ fontFamily: "sora, sans-serif" }}
              >
                Dirección de Despacho
              </h3>
              <div
                className="space-y-4"
                style={{ fontFamily: "sora, sans-serif" }}
              >
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Dirección Completa
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-[#2e5b61]"
                    placeholder="3828 Piermont Drive"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Comuna / Ciudad
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-[#2e5b61]"
                    placeholder="Albuquerque, Nuevo México"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div style={{ fontFamily: "sora, sans-serif" }}>
              <h3 className="text-lg font-semibold text-[#2e5b61] mb-3 border-b pb-2 pt-2">
                Método de Pago
              </h3>
              <div className="bg-[#f6efe2]  p-4 rounded-lg border border-gray-200 space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    maxLength="19"
                    className="w-full border border-gray-300 rounded p-2 tracking-widest focus:outline-none focus:border-[#2e5b61]"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Nombre en la Tarjeta
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-[#2e5b61]"
                    placeholder="ANTONIO OSSA"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-600 mb-1">
                      Expiración
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      maxLength="5"
                      className="w-full border border-gray-300 rounded p-2 text-center focus:outline-none focus:border-[#2e5b61]"
                      placeholder="MM/AA"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-600 mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      name="cvv"
                      maxLength="3"
                      className="w-full border border-gray-300 rounded p-2 text-center focus:outline-none focus:border-[#2e5b61]"
                      placeholder="XXX"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div
          className="bg-[#e7e1d5] rounded-lg p-6 shadow-md flex flex-col justify-between sticky top-10"
          style={{ fontFamily: "sora, sans-serif" }}
        >
          <div>
            <h2 className="text-xl font-bold text-[#2e5b61] mb-4">
              Resumen de tu Compra
            </h2>
            {cartList.length === 0 ? (
              <p className="text-gray-500 mb-4">
                No hay productos para comprar.
              </p>
            ) : (
              <ul className="mb-4 space-y-2 max-h-56 md:max-h-80 overflow-y-auto pr-2">
                {cartList.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between text-gray-700  border-[#2e5b61] pb-2 last:border-0"
                  >
                    <span className="text-sm">
                      {item.name}{" "}
                      <span className="font-bold">
                        x{item.CartItem?.quantity ?? item.quantity ?? 1}
                      </span>
                    </span>
                    <span className="font-semibold text-sm">
                      $
                      {(
                        item.price *
                        (item.CartItem?.quantity ?? item.quantity ?? 1)
                      ).toLocaleString("es-CL")}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t  pt-4 flex justify-between items-center mt-4">
              <span className="text-lg font-bold text-[#2e5b61]">
                Total a Pagar:
              </span>
              <span className="text-2xl font-bold text-[#2e5b61]">
                {`$ ${totalPrice()}`}
              </span>
            </div>
          </div>
          <div>
            <button
              className="mt-8 w-full bg-[#2e5b61] text-[#f6efe2] py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors shadow-lg"
              onClick={handleCheckout}
              disabled={cartList.length === 0}
            >
              Confirmar y Pagar
            </button>
            <button
              className="mt-4 w-full bg-[#4a8087] text-[#f6efe2] py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors shadow-lg"
              onClick={() => navigate("/products")}
            >
              Ver más productos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
