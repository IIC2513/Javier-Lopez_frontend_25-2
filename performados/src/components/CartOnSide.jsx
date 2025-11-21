import React from "react";
import axios from "axios";
const URL_API = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";

function CartOnSide({
  isOpen,
  isLogged,
  cartList,
  setCartList,
  setterCartOpen,
}) {
  const showCart = isOpen && isLogged;
  const navigate = useNavigate();
  const totalPrice = () => {
    const total = cartList.reduce(
      (acc, item) =>
        acc + item.price * (item.CartItem?.quantity || item.quantity || 1),
      0
    );
    return total.toLocaleString("es-CL") + " CLP";
  };

  const addMore = (productId, quantity) => async () => {
    try {
      const response = await axios.post(
        `${URL_API}/cart/products/${productId}`,
        {
          userId: JSON.parse(localStorage.getItem("currentUser")).id,
          quantity: quantity,
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error al añadir el producto al carrito:", error);
    }
  };

  const deleteFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `${URL_API}/cart/products/${productId}`,
        {
          data: { userId: JSON.parse(localStorage.getItem("currentUser")).id },
        }
      );
      console.log("Producto eliminado del carrito:", response.data);
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/50 z-50
          transition-opacity duration-300
          ${showCart ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setterCartOpen(false)}
        aria-hidden="true"
      ></div>
      <div
        className={`
          Carrito fixed top-0 right-0 h-screen w-96 bg-[#f6efe2] shadow-xl 
          z-[100]
          transition-transform duration-300 ease-in-out
          ${showCart ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
      >
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2
              className="text-2xl font-bold text-[#2e5b61]"
              style={{ fontFamily: "sora, sans-serif" }}
            >
              Mi Carrito
            </h2>
            <button
              onClick={() => setterCartOpen(false)}
              className="text-2xl text-[#2e5b61] hover:text-red-500 hover:cursor-pointer"
            >
              &times;
            </button>
          </div>
          <div className="List-Products">
            {cartList.length === 0 ? (
              <p className="text-[#2e5b61]">Tu carrito está vacío.</p>
            ) : (
              cartList.map((item) => (
                <div
                  style={{
                    fontFamily: "sora, sans-serif",
                  }}
                  key={item.id}
                  className="flex items-center justify-between mb-4 p-2 border-b border-gray-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-[#2e5b61]">
                      {item.name}
                    </h3>

                    <p className="text-sm pt-1 font-medium text-gray-600">
                      ${item.price}
                    </p>
                    <div className="flex">
                      <p className="text-xs pt-1 text-gray-600">
                        Cantidad: {item.CartItem?.quantity || item.quantity}
                      </p>
                      <button
                        onClick={addMore(item.id, 1)}
                        className="ml-2 text-[#f6efe2] hover:text-blue-700 hover:cursor-pointer text-xs bg-[#2f5b61] px-1 rounded-md"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs pt-1 text-gray-500">
                      stock: {item.stock}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCartList((prevCart) =>
                        prevCart.filter((cartItem) => cartItem.id !== item.id)
                      );
                      deleteFromCart(item.id);
                    }}
                    className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-300">
          {cartList.length === 0 ? (
            <button
              onClick={() => {
                setterCartOpen(false);
                navigate("/products");
              }}
              className="w-full bg-[#2e5b61] text-[#f6efe2] py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors"
            >
              Añadir Productos
            </button>
          ) : (
            <>
              <div className="mb-4">
                <span
                  className="text-lg font-bold text-[#2e5b61]"
                  style={{ fontFamily: "sora, sans-serif" }}
                >
                  Total: $ {totalPrice()}
                </span>
              </div>
              <button
                onClick={() => {
                  navigate("/summary");
                  setterCartOpen(false);
                }}
                className="w-full bg-[#2e5b61] text-[#f6efe2] py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors"
              >
                Ir a Comprar
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartOnSide;
