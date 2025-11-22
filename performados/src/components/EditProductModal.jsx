import React, { useState, useEffect, useRef } from "react";
import FeedbackModal from "./FeedbackModal";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24"
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
      className="fixed inset-0 z-500 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl transition-transform duration-300 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Editar Producto</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
              {Object.entries(categories).map(([name, id]) => (
                <option key={id} value={id}>{name.charAt(0).toUpperCase() + name.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Precio</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Producto</label>
            <div className="flex items-center space-x-6">
              <div className="shrink-0">
                {imagePreview ? (
                  <img className="h-32 w-32 object-cover rounded-lg border border-gray-200" src={imagePreview} alt="Vista previa" />
                ) : (
                  <div className="h-32 w-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50">
                    <span className="text-xs">Sin imagen</span>
                  </div>
                )}
              </div>
              <label className="block">
                <span className="sr-only">Elegir nueva foto</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  ref={fileInputRef}
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                    file:text-sm file:font-semibold file:bg-[#2e5b61] file:text-white
                    hover:file:bg-[#24484d] cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
          </div>
          
          <div className="flex flex-col-reverse gap-4 pt-4 border-t border-gray-200 sm:flex-row sm:justify-end sm:gap-3">
            <button type="button" onClick={handleClose} disabled={isUploading} className="w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:w-auto sm:text-sm">
              Cancelar
            </button>
            <button type="submit" disabled={isUploading} className={`w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm sm:w-auto sm:text-sm ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2e5b61] hover:bg-opacity-90'}`}>
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