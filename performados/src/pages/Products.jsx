import React, { useMemo, useState, useEffect } from "react";
import PillNav from "../components/ProductBar";
import CategoryBar from "../components/CategoryBar";
import FilterBar from "../components/FilterBar";
import Product from "./Product";
import { EditProductModal } from "../components/EditProductModal";
import toteBagClairo from "../assets/Totebag-Clairo.png";
import toteBagLaufey from "../assets/Totebag-Laufey.png";
import labubu from "../assets/labubu-1.png";
import labubu2 from "../assets/labubu-2.png";
import labubu3 from "../assets/labubu-3.png";
import SegundoSexo from "../assets/libro.png";
import KitMatcha from "../assets/kit-matcha.png";
import { Link } from "react-router-dom";

const categories = {
  totebags: 1,
  labubus: 2,
  discos: 3,
  libros: 4,
  matcha: 5,
  accesorios: 6,
};

const API_URL = import.meta.env.VITE_API_URL;

let products_fetched = [];

const Products = ({ setCartList, cartList, setterCartOpen }) => {
  let [products, setProducts] = useState([]);
  let [selectedCategory, setSelectedCategory] = useState(null);
  let [selectedPriceRange, setSelectedPriceRange] = useState(null);
  let [selectedCondition, setSelectedCondition] = useState(null);
  let [selectedColor, setSelectedColor] = useState(null);
  let [selectedName, setSelectedName] = useState(null);

  let [selectedProduct, setSelectedProduct] = useState(null);
  let [isProductOpen, setIsProductOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    productsFetch();
  }, []);

  const openProduct = (product) => {
    console.log(`Producto abierto ${product.name}`);
    setSelectedProduct(product);
    setIsProductOpen(true);
  };

  const productsFetch = async () => {
    try {
      console.log("Fetching products from API...");
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      products_fetched = data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  //let [filteredProducts, setFilteredProducts] = useState(products_fetched);
  const filteredProducts = useMemo(() => {
    return products_fetched.filter((product) => {
      if (selectedCategory) {
        const catId = categories[selectedCategory];
        if (product.categoryId !== catId) return false;
      }
      if (selectedName) {
        const q = String(selectedName).toLowerCase();
        if (!String(product.name).toLowerCase().includes(q)) return false;
      }
      if (selectedColor) {
        if (!product.color || product.color !== selectedColor) return false;
      }
      if (selectedCondition) {
        if (!product.condition || product.condition !== selectedCondition)
          return false;
      }
      if (selectedPriceRange) {
        const p = Number(product.price || 0);
        if (selectedPriceRange === "under-20000" && p >= 20000) return false;
        if (selectedPriceRange === "20000-40000" && (p < 20000 || p > 40000))
          return false;
        if (selectedPriceRange === "over-40000" && p <= 40000) return false;
      }
      return true;
    });
  }, [
    products,
    selectedCategory,
    selectedName,
    selectedColor,
    selectedCondition,
    selectedPriceRange,
  ]);

  return (
    <>
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
      />
      {isProductOpen && selectedProduct ? (
        <Product
          {...selectedProduct}
          setIsProductOpen={setIsProductOpen}
          setCartList={setCartList}
          cartList={cartList}
          setterCartOpen={setterCartOpen}
          OwnerId={selectedProduct.ownerId}
          openEditModal={() => setIsEditModalOpen(true)}
        />
      ) : (
        <div className="min-h-screen bg-[#ece2cc]">
          <div className="flex flex-col">
            <div className="bg-[#2e5b61] text-[#efe6d2] shadow-md pt-25 pb-10 sm:py-20 md:pb-10 sm:pt-30 md:pt-30 lg:pt-28 lg:pb-10 px-4">
              <h2
                className=" text-sm font-bold text-center mt-10 mb-1"
                style={{
                  fontFamily: "sora, sans-serif",
                }}
              >
                ¡llego la hora de performarse!
              </h2>
              <h2
                className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center"
                style={{
                  fontFamily: "Anton, sans-serif",
                }}
              >
                SUMATE AL CAMBIO
              </h2>
            </div>

            <div className="flex-col justify-center">
              <div className="Barra-Categorias">
                <CategoryBar onCategorySelect={setSelectedCategory} />
              </div>
              <div>
                <FilterBar
                  setterColor={setSelectedColor}
                  setterName={setSelectedName}
                  setterCondition={setSelectedCondition}
                  setterPriceRange={setSelectedPriceRange}
                />
              </div>
              <div className="Products container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-[#e7dcc775]  p-3 flex flex-col items-center text-center shadow-sm hover:shadow-2xl transition-shadow duration-300 hover:cursor-pointer "
                      onClick={() => openProduct(product)}
                    >
                      <div className="grow flex flex-col items-center justify-center">
                        <div className="image-container mb-4 flex justify-center items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 sm:w-28 sm:h-28 md:w-50 md:h-50 lg:w-80 lg:h-80 object-contain"
                          />
                        </div>
                        <h2
                          className="text-lg sm:text-xl md:text-xl lg:text-xl font-semibold mb-2 text-[#26484d]"
                          style={{
                            fontFamily: "sora, sans-serif",
                          }}
                        >
                          {product.name}
                        </h2>
                        <p
                          className=" text-sm sm:text-sm md:text-sm lg:text-sm text-[#2e5b61]"
                          style={{
                            fontFamily: "sora, sans-serif",
                          }}
                        >
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
