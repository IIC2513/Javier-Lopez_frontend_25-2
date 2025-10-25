import React from "react";

function CartOnSide({
  isOpen,
  isLogged,
  cartList,
  setCartList,
  setterCartOpen,
}) {
  const showCart = isOpen && isLogged;

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
          Carrito fixed top-0 right-0 h-screen w-80 bg-[#f6efe2] shadow-xl overflow-y-auto
          z-[100]
          transition-transform duration-300 ease-in-out
          ${showCart ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-4">
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
        </div>
      </div>
    </>
  );
}

export default CartOnSide;
