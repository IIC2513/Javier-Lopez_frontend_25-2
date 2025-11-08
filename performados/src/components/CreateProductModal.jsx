import React, { useState, useEffect, useRef } from 'react';

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

export const CreateProductModal = ({ isOpen, onClose, currentUser }) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [color, setColor] = useState('');
  const [condition, setCondition] = useState('new');
  const [description, setDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [errorMessage, setErrorMessage] = useState(null);

  const fileInputRef = useRef(null);


  const handleClose = () => {
    setProductName('');
    setCategory('');
    setPrice('');
    setStock('');
    setColor('');
    setCondition('new');
    setDescription('');
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

    // Validar que el usuario (ownerId) existe
    // if (!currentUser || !currentUser.id) { // <-- Se mantiene comentado
    //   setErrorMessage("Error: Debes iniciar sesión para crear un producto.");
    //   return;
    // }


    if (productImage) {
      console.warn("La subida de archivos aún no está implementada. Se enviará 'null' como imagen.");
      // Aquí iría la lógica de subida de imagen.
      // Por ahora, 'image' se envía como null.
    }

    const productData = {
      name: productName,
      categoryId: parseInt(category), 
      price: parseInt(price),       
      stock: parseInt(stock),       
      color: color,
      condition: condition,
      description: description,
      
      ownerId: 1, // Debería ser currentUser.id
      isOfficial: true, 
      isActive: true,               
      image: null // Cambiar esto cuando la subida de archivos esté lista
    };

    console.log("Enviando datos al backend:", JSON.stringify(productData, null, 2));

    try {

      const response = await fetch(`${URL_API}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {

        const errorData = await response.json();
        throw new Error(errorData.message || `Error del servidor: ${response.status}`);
      }

      const newProduct = await response.json();
      console.log("Producto creado exitosamente:", newProduct);
      
      alert("¡Producto creado exitosamente!"); 
      
      handleClose(); 

    } catch (error) {
      console.error("Error al crear el producto:", error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleClose]); // handleClose está memoizada por React (viene de un hook o props)

  useEffect(() => {
    // Limpiar la URL del objeto cuando el componente se desmonte o la imagen cambie
    return () => {
      if (imagePreview) {
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
            Subir Nuevo Producto
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre del Producto
              </label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Categoría
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Selecciona una categoría</option>
                <option value="1">Totebag</option>
                <option value="2">Labubu</option>
                <option value="3">Disco</option>
                <option value="4">Libro</option>
                <option value="5">Matcha</option>
                <option value="6">Accesorio</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Precio (CLP)
              </label>
              <div className="relative mt-1">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min="0"
                  className="block w-full rounded-md border-gray-300 shadow-sm pl-7 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="10000"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock Disponible
              </label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700"
              >
                Color
              </label>
              <input
                type="text"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: Rojo, Azul, Negro"
              />
            </div>
            <div>
              <label
                htmlFor="condition"
                className="block text-sm font-medium text-gray-700"
              >
                Condición
              </label>
              <select
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="new">Nuevo</option>
                <option value="used">Usado</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Detalles del producto, materiales, etc."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Imagen del Producto
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <div
              className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 cursor-pointer hover:border-blue-500"
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="h-48 w-auto object-contain rounded-md"
                  L
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
                    className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600"
                    aria-label="Quitar imagen"
                  >
                    <CloseIcon />
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
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
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-[#2f5b61] hover:text-blue-500">
                      Haz clic para subir
                    </span>{' '}
                    o arrastra y suelta
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF hasta 10MB
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {errorMessage && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">
                {errorMessage}
              </p>
            </div>
          )}

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
              Subir Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};