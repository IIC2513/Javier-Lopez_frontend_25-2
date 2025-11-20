import React, { useState } from "react";
import axios from "axios";
const URL_API = import.meta.env.VITE_API_URL;

const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const colorThemes = {
  pink: "bg-[#fd538d]",
  white: "bg-[#ece2cc]",
  green: "bg-[#839243]",
  gray: "bg-[#fca41d]",
  blue: "bg-[#2f5b61]",
  black: "bg-[#fca41d]",
  brown: "bg-[#7b5338]",
  default: "bg-[#f6efe2]",
};

function Product({
  id,
  OwnerId,
  categoryId,
  condition,
  image,
  description,
  isOfficial,
  isActive,
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
  const isOwner = currentUser.id === OwnerId;
  console.log("Current User ID:", currentUser.id);
  console.log("Product Owner ID:", OwnerId);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        `${URL_API}/cart/products/${productId}`,
        {
          userId: currentUser.id,
          quantity: 1,
        }
      );
      console.log("Producto añadido al carrito:", response.data);
    } catch (error) {
      console.error("Error al añadir el producto al carrito:", error);
    }
  };

  const handleAddToCart = () => {
    addToCart(id);
    setCartList((prevCart) => {
      const productToAdd = {
        id,
        name,
        price,
        image,
        color,
        quantity: 1,
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

  const URL_API = import.meta.env.VITE_API_URL;

  const handleDeleteProduct = async () => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?"))
      return;
    try {
      const response = await axios.delete(`${URL_API}/products/${id}`);
      if (response.status !== 200) {
        throw new Error("Error al eliminar el producto");
        alert("Error al eliminar el producto");
      }
      alert("Producto eliminado exitosamente");
      setIsProductOpen(false);
      window.location.reload();
    } catch (error) {
      alert(
        "Error al eliminar el producto: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div
      className={`fixed inset-0 ${colorThemes[color]} flex items-center justify-center z-50 p-4`}
    >
      <div className="bg-[#f6efe2] rounded shadow-2xl max-w-4xl w-full relative grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-[#2e5b61] hover:text-[#1a3a3e] z-10 hover:cursor-pointer"
          onClick={() => setIsProductOpen(false)}
        >
          <CloseIcon />
        </button>
        <div className="p-8 mt-8 md:p-8 flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="w-full h-auto max-h-[60vh] object-contain rounded-md"
          />
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
                className="w-full bg-[#2e5b61] text-[#f6efe2] mt-2 py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e5b61] focus:ring-offset-[#f6efe2] hover:cursor-pointer"
              >
                Editar Producto
              </button>
              <button
                onClick={handleDeleteProduct}
                className="w-full bg-[#fb2c35] text-[#f6efe2] mt-2 py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e5b61] focus:ring-offset-[#f6efe2] hover:cursor-pointer"
              >
                Eliminar Producto
              </button>
            </>
          ) : isInCart ? (
            <button
              onClick={handleViewCart}
              className="w-full bg-[#2e5b61] text-[#f6efe2] py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e5b61] focus:ring-offset-[#f6efe2] hover:cursor-pointer"
            >
              Ver en el Carrito
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#2e5b61] text-[#f6efe2] py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e5b61] focus:ring-offset-[#f6efe2] hover:cursor-pointer"
            >
              Añadir al Carrito
            </button>
          )}
          <button
            onClick={() => {
              setIsProductOpen(false);
            }}
            className="w-full bg-[#6b9ca3] text-[#f6efe2] mt-2 py-3 rounded-lg font-semibold hover:bg-[#243e42] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e5b61] focus:ring-offset-[#f6efe2] hover:cursor-pointer"
          >
            Volver a la Tienda
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
