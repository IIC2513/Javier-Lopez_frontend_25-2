import React from "react";

function CartOnSide({
  isOpen,
  isLogged,
  cartList,
  setCartList,
  setterCartOpen,
}) {
  const showCart = isOpen && isLogged;

  const totalPrice = () => {
    console.log("Calculating total price...");
    console.log(cartList);
    return cartList.reduce(
      (acc, item) => acc + item.price * item.CartItem?.quantity,
      0
    );
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
                    <p className="text-xs pt-1 text-gray-600">
                      Cantidad: {item.CartItem?.quantity || item.quantity}
                    </p>
                    <p className="text-xs pt-1 text-gray-500">
                      stock: {item.stock}
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

        <div className="p-4 border-t border-gray-300">
          {cartList.length === 0 ? (
            <button
              onClick={() => setterCartOpen(false)}
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
                  Total: ${totalPrice()}
                </span>
              </div>
              <button
                onClick={() => {
                  if (cartList.some((item) => item.id === 28)) {
                    window.location.href =
                      "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                  } else {
                    window.location.href =
                      "https://www.youtube.com/watch?v=vNhs9CSI0Vc";
                  }
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
