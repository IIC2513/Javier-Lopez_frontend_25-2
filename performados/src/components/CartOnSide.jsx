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
          Carrito fixed top-0 right-0 h-screen w-90 bg-[#f6efe2] shadow-xl overflow-y-auto
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
                    <p className="text-xs pt-1 text-gray-600">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setCartList((prevCart) =>
                        prevCart.filter((cartItem) => cartItem.id !== item.id)
                      )
                    }
                    className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CartOnSide;
