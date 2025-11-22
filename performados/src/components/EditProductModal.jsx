import React, { useState, useEffect, useRef } from "react";
import FeedbackModal from "./FeedbackModal";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const URL_API = import.meta.env.VITE_API_URL;

const CLOUD_NAME = "df4lpj4ay"; 
const UPLOAD_PRESET = "javierlopez_default";

const categories = {
  totebags: 1,
  labubus: 2,
  discos: 3,
  libros: 4,
  matcha: 5,
  accesorios: 6,
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

export const EditProductModal = ({ isOpen, onClose, product }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "success",
    message: ""
  });
  const fileInputRef = useRef(null);

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
    setIsUploading(false);
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

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (!res.ok) throw new Error("Error al subir imagen a Cloudinary");
      return data.secure_url;
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      throw error;
    }
  };

  const handleFeedbackClose = () => {
    setFeedback({ ...feedback, isOpen: false });
    if (feedback.type === "success") {
      handleClose();
      window.location.reload();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalImageUrl = product.image;
      if (productImage) {
        finalImageUrl = await uploadImageToCloudinary(productImage);
      }
      const productData = {
        name: productName,
        categoryId: parseInt(category),
        price: parseInt(price),
        stock: parseInt(stock),
        color: color,
        description: description,
        image: finalImageUrl
      };
      if (productData.stock < 0) {
        setFeedback({
          isOpen: true,
          type: "error",
          message: "No puedes establecer un stock negativo.",
        });
        return;
      }
      const response = await fetch(`${URL_API}/products/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error del servidor: ${response.status}`);
      }
      setFeedback({
        isOpen: true,
        type: "success",
        message: "¡El producto se actualizó correctamente!"
      });
    } catch (error) {
      setFeedback({
        isOpen: true,
        type: "error",
        message: error.message || "Ocurrió un error al actualizar."
      });
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (event) => { if (event.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  useEffect(() => {
    return () => {
      if (imagePreview && typeof imagePreview === "string" && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-500 flex items-center justify-center bg-black/40 backdrop-blur-sm p-2 md:p-6 transition-opacity duration-300"
        onClick={handleClose}
      >
        <div
          className="relative w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#f6efe2] p-6 md:p-10 shadow-2xl transition-transform duration-300 max-h-[92vh] border border-[#d3c9b6]"
          onClick={(e) => e.stopPropagation()}
          style={{ fontFamily: "sora, sans-serif" }}
        >
          <div className="flex items-start justify-between pb-6 border-b border-[#d3c9b6]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2e5b61]">Editar Producto</h2>
            <button
              onClick={handleClose}
              className="text-[#2e5b61] hover:text-[#fb2c35] transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="productName" className="block text-base font-semibold text-[#26484d] mb-2">Nombre del Producto</label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg border border-[#d3c9b6] bg-[#f6efe2] px-4 py-3 shadow-sm focus:border-[#8467bb] focus:ring-[#8467bb] text-[#2e5b61]"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-base font-semibold text-[#26484d] mb-2">Categoría</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg border border-[#d3c9b6] bg-[#f6efe2] px-4 py-3 shadow-sm focus:border-[#8467bb] focus:ring-[#8467bb] text-[#2e5b61]"
                >
                  <option value="" disabled>Selecciona una categoría</option>
                  {Object.entries(categories).map(([name, id]) => (
                    <option key={id} value={id}>{name.charAt(0).toUpperCase() + name.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="price" className="block text-base font-semibold text-[#26484d] mb-2">Precio (CLP)</label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#8467bb] font-bold">$</span>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min="0"
                    className="block w-full rounded-lg border border-[#d3c9b6] bg-[#f6efe2] pl-8 pr-2 py-3 shadow-sm focus:border-[#8467bb] focus:ring-[#8467bb] text-[#2e5b61]"
                    placeholder="10000"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="stock" className="block text-base font-semibold text-[#26484d] mb-2">Stock Disponible</label>
                <input
                  type="number"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  min="0"
                  className="mt-1 block w-full rounded-lg border border-[#d3c9b6] bg-[#f6efe2] px-4 py-3 shadow-sm focus:border-[#8467bb] focus:ring-[#8467bb] text-[#2e5b61]"
                  placeholder="50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="color" className="block text-base font-semibold text-[#26484d] mb-2">Color</label>
                <select
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg border border-[#d3c9b6] bg-[#f6efe2] px-4 py-3 shadow-sm focus:border-[#8467bb] focus:ring-[#8467bb] text-[#2e5b61]"
                >
                  <option value="" disabled>Selecciona un color</option>
                  {colorOptions.map((col) => (
                    <option key={col.value} value={col.value}>
                      {col.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-base font-semibold text-[#26484d] mb-2">Descripción</label>
                <textarea
                  id="description"
                  rows="2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg border border-[#d3c9b6] bg-[#f6efe2] px-3 py-2 shadow-sm focus:border-[#8467bb] focus:ring-[#8467bb] text-[#2e5b61]"
                  placeholder="Detalles del producto, materiales, etc."
                  style={{ minHeight: '48px', maxHeight: '50px' }}
                ></textarea>
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-[#26484d] mb-2">Imagen del Producto</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <div
                className="mt-2 flex justify-center rounded-xl border-2 border-dashed border-[#d3c9b6] px-4 pt-4 pb-4 cursor-pointer hover:border-[#8467bb] bg-[#f6efe2]"
                onClick={() => fileInputRef.current.click()}
                style={{ minHeight: '120px', maxHeight: '180px' }}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      className="h-32 w-auto object-contain rounded-lg border border-[#d3c9b6]"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        setProductImage(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = null;
                        }
                      }}
                      className="absolute -top-3 -right-3 rounded-full bg-[#fb2c35] p-2 text-white shadow-md hover:bg-[#d91b23]"
                      aria-label="Quitar imagen"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 text-center">
                    <svg
                      className="mx-auto h-10 w-10 text-[#8467bb]"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-sm text-[#2e5b61]">
                      <span className="font-semibold hover:text-[#8467bb]">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-[#8467bb]">PNG, JPG, GIF hasta 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* BOTONES */}
            <div className="flex flex-col-reverse gap-4 mt-4 sm:flex-row sm:justify-center sm:gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isUploading}
                className="w-full justify-center rounded-lg border border-[#d3c9b6] bg-white px-4 py-3 text-base font-semibold text-[#2e5b61] shadow-sm hover:bg-[#ece2cc] sm:w-auto sm:text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className={`w-full justify-center rounded-lg border border-transparent px-4 py-3 text-base font-semibold text-white shadow-sm sm:w-auto sm:text-sm transition-colors ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2e5b61] hover:bg-[#8467bb]'}`}
              >
                {isUploading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <FeedbackModal
        isOpen={feedback.isOpen}
        type={feedback.type}
        message={feedback.message}
        onClose={handleFeedbackClose}
      />
    </>
  );
};