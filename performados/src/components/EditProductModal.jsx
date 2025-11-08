import React, { useState, useEffect, useRef } from "react";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const URL_API = import.meta.env.VITE_API_URL;

export const EditProductModal = ({ isOpen, onClose, product }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const fileInputRef = useRef(null);

  // Rellenar campos al abrir el modal
  useEffect(() => {
    if (product && isOpen) {
      setProductName(product.name || "");
      setCategory(product.categoryId ? String(product.categoryId) : "");
      setPrice(product.price || "");
      setStock(product.stock || "");
      setColor(product.color || "");
      setDescription(product.description || "");
      setImagePreview(product.image || null);
      setProductImage(null);
    }
  }, [product, isOpen]);

  const handleClose = () => {
    setProductName("");
    setCategory("");
    setPrice("");
    setStock("");
    setColor("");
    setDescription("");
    setProductImage(null);
    setImagePreview(null);
    setErrorMessage(null);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    let imageToSend = product.image;
    if (productImage) {
      alert("La subida de imagenes aun no esta implementada");
    }

    const productData = {
      name: productName,
      categoryId: parseInt(category),
      price: parseInt(price),
      stock: parseInt(stock),
      color: color,
      description: description,
      image: imageToSend,
    };

    try {
      const response = await fetch(`${URL_API}/products/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Error del servidor: ${response.status}`
        );
      }

      const updatedProduct = await response.json();
      alert("¡Producto actualizado exitosamente!");
      handleClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        typeof imagePreview === "string" &&
        imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-500 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl transition-transform duration-300 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            Editar Producto
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <input
              type="number"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="flex flex-col-reverse gap-4 pt-4 border-t border-gray-200 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full justify-center rounded-md border border-transparent bg-[#2f5b61] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-[#2f5b61]/50 sm:w-auto sm:text-sm"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
