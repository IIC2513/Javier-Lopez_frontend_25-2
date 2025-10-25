import React, { useMemo, useState, useEffect } from "react";
import PillNav from "../components/ProductBar";
import CategoryBar from "../components/CategoryBar";
import FilterBar from "../components/FilterBar";
import Product from "./Product";

import toteBagClairo from "../assets/Totebag-Clairo.png";
import toteBagLaufey from "../assets/Totebag-Laufey.png";
import labubu from "../assets/labubu-1.png";
import labubu2 from "../assets/labubu-2.png";
import labubu3 from "../assets/labubu-3.png";
import SegundoSexo from "../assets/libro.png";
import KitMatcha from "../assets/kit-matcha.png";
import { Link } from "react-router-dom";

// Hardcodeo de productos
let products_fetched = [
  {
    id: 6,
    OwnerId: 1,
    categoryId: 3,
    condition: "nuevo",
    image:
      "https://sound-merch.com.au/cdn/shop/products/CLARIO_1024x1024.png?v=1627447943",
    description: "Vinyl edición especial",
    isOfficial: true,
    isActive: true,
    name: "Sling - Clairo (Vinyl)",
    price: 34990,
    color: "black",
    stock: 15,
  },
  {
    id: 7,
    OwnerId: 1,
    categoryId: 3,
    condition: "nuevo",
    image:
      "https://sound-merch.com.au/cdn/shop/files/laufey_5b310b20-04b5-4604-836d-e29eecdec668_1024x1024.png?v=1715653269",
    description: "Vinyl edición gatefold",
    isOfficial: true,
    isActive: true,
    name: "Bewitched - Laufey (Vinyl)",
    price: 39990,
    color: "blue",
    stock: 10,
  },
  {
    id: 9,
    OwnerId: 1,
    categoryId: 3,
    condition: "nuevo",
    image:
      "https://sound-merch.com.au/cdn/shop/files/mitski-cowboy_1024x1024.png?v=1710895852",
    description: "Vinyl 'Be the Cowboy'",
    isOfficial: true,
    isActive: true,
    name: "Be The Cowboy - Mitski (Vinyl)",
    price: 36990,
    color: "black",
    stock: 10,
  },
  {
    id: 8,
    OwnerId: 1,
    categoryId: 3,
    condition: "nuevo",
    image:
      "https://sound-merch.com.au/cdn/shop/files/DYK_91cb6bc8-4f6f-4309-9545-95fe7476de2f_1024x1024.png?v=1700025259",
    description: "Vinyl doble color exclusivo",
    isOfficial: true,
    isActive: true,
    name: "Did you know that there's a tunnel... - Lana Del Rey (Vinyl)",
    price: 45990,
    color: "black",
    stock: 5,
  },

  {
    id: 10,
    OwnerId: 1,
    categoryId: 3,
    condition: "nuevo",
    image:
      "https://sound-merch.com.au/cdn/shop/products/Fearless-TS_1024x1024.png?v=1652764233",
    description: "Vinyl '3xLP Vinyl Taylor's Version'",
    isOfficial: true,
    isActive: true,
    name: "Fearless (Taylor's Version)",
    price: 42990,
    color: "white",
    stock: 20,
  },
  {
    id: 1,
    OwnerId: 1,
    categoryId: 1,
    condition: "nuevo",
    image: toteBagClairo,
    description: "Producto oficial de la pagina",
    isOfficial: true,
    isActive: true,
    name: "Totebag Clairo",
    price: 15990,
    color: "white",
    stock: 30,
  },
  {
    id: 2,
    OwnerId: 1,
    categoryId: 1,
    condition: "nuevo",
    image: toteBagLaufey,
    description: "Producto oficial de la pagina",
    isOfficial: true,
    isActive: true,
    name: "Totebag Laufey",
    price: 19990,
    color: "black",
    stock: 10,
  },
  {
    id: 3,
    OwnerId: 1,
    categoryId: 2,
    condition: "nuevo",
    image: labubu3,
    description: "Producto oficial de la pagina",
    isOfficial: true,
    isActive: true,
    name: "Labubu 3",
    price: 29990,
    color: "pink",
    stock: 20,
  },
  {
    id: 4,
    OwnerId: 1,
    categoryId: 2,
    condition: "nuevo",
    image: labubu2,
    description: "Producto oficial de la pagina",
    isOfficial: true,
    isActive: true,
    name: "Labubu 2",
    price: 39990,
    color: "pink",
    stock: 20,
  },
  {
    id: 5,
    OwnerId: 1,
    categoryId: 2,
    condition: "nuevo",
    image: labubu,
    description: "Producto oficial de la pagina",
    isOfficial: true,
    isActive: true,
    name: "Labubu 1",
    price: 29990,
    color: "pink",
    stock: 20,
  },
  {
    id: 11,
    OwnerId: 2,
    categoryId: 4,
    condition: "usado",
    image: SegundoSexo,
    description: "Ensayo fundamental del feminismo",
    isOfficial: true,
    isActive: true,
    name: "El Segundo Sexo - Simone de Beauvoir",
    price: 22990,
    color: "brown",
    stock: 25,
  },

  {
    id: 15,
    OwnerId: 1,
    categoryId: 5,
    condition: "nuevo",
    image: KitMatcha,
    description:
      "7 piezas, batidor y tazón Matcha con pico, tamiz de polvo, portabatazos, pala de bambú y reposo de pala, herramientas de preparación perfectas para preparar té Matcha",
    isOfficial: true,
    isActive: true,
    name: "Kit de Matcha de 7 piezas",
    price: 39990,
    color: "green",
    stock: 18,
  },
  {
    id: 16,
    OwnerId: 1,
    categoryId: 5,
    condition: "nuevo",
    image:
      "https://png.pngtree.com/png-clipart/20250108/original/pngtree-matcha-tea-powder-bowl-png-image_19802080.png",
    description: "30g de matcha grado ceremonial de Uji, Japón",
    isOfficial: true,
    isActive: true,
    name: "Polvo de Matcha",
    price: 18990,
    color: "green",
    stock: 40,
  },
  {
    id: 18,
    OwnerId: 1,
    categoryId: 6,
    condition: "nuevo",
    image:
      "https://cdn.shopify.com/s/files/1/1135/7914/files/Now_Gen3_White_Shadow_2200px.png?v=1753860852",
    description: "Cámara instantánea moderna con look retro",
    isOfficial: false,
    isActive: true,
    name: "Cámara Polaroid Now (Blanco)",
    price: 129990,
    color: "white",
    stock: 8,
  },
  {
    id: 19,
    OwnerId: 1,
    categoryId: 6,
    condition: "nuevo",
    image:
      "https://kor-distribucion.com/6797-large_default/agfaphoto-camara-analogica-35mm-reusable-black.jpg",
    description: "Cámara de un solo uso con flash, 27 exposiciones",
    isOfficial: false,
    isActive: true,
    name: "Cámara Análoga ",
    price: 16990,
    color: "black",
    stock: 30,
  },
  {
    id: 20,
    OwnerId: 1,
    categoryId: 6,
    condition: "nuevo",
    image:
      "https://catalogo.movistar.cl/media/catalog/product/cache/ebb05d1087fcce3e5d25fdf0f48435b2/3/7/370x700_earpodswith_lightningconnector.webp",
    description: "Audífonos alámbricos con estética retro",
    isOfficial: false,
    isActive: true,
    name: "Audífonos Alámbricos Retro ",
    price: 12990,
    color: "white",
    stock: 50,
  },
  {
    id: 21,
    OwnerId: 1,
    categoryId: 6,
    condition: "nuevo",
    image:
      "https://cdnx.jumpseller.com/lerdercam/image/51629961/resize/610/610?1723654556",
    description: "Vela aromática con fragancia a pimienta y limón",
    isOfficial: true,
    isActive: true,
    name: "Vela Aromática Cozy Winter",
    price: 14990,
    color: "brown",
    stock: 22,
  },
  {
    id: 26,
    OwnerId: 1,
    categoryId: 1,
    condition: "nuevo",
    image:
      "https://d22fxaf9t8d39k.cloudfront.net/b77f27a9d33508c4bb6828169cfc3a31b3516e510404678a342cc5e41be3e2b321458.png",
    description: "Totebag oficial 'LDR'",
    isOfficial: true,
    isActive: true,
    name: "Totebag Lana Del Rey",
    price: 19990,
    color: "black",
    stock: 10,
  },
  {
    id: 27,
    OwnerId: 1,
    categoryId: 3,
    condition: "nuevo",
    image:
      "https://sound-merch.com.au/cdn/shop/files/Standard-LP_1024x1024.png?v=1723765435",
    description: "Vinyl edición especial",
    isOfficial: true,
    isActive: true,
    name: "This Is How Tomorrow Moves - Beabadoobee (Vinyl)",
    price: 34990,
    color: "black",
    stock: 15,
  },
];

const categories = {
  labubus: 2,
  discos: 3,
  totebags: 1,
  libros: 4,
  matcha: 5,
  accesorios: 6,
};

const Products = ({ setCartList, cartList, setterCartOpen }) => {
  let [selectedCategory, setSelectedCategory] = useState(null);
  let [selectedPriceRange, setSelectedPriceRange] = useState(null);
  let [selectedCondition, setSelectedCondition] = useState(null);
  let [selectedColor, setSelectedColor] = useState(null);
  let [selectedName, setSelectedName] = useState(null);

  let [selectedProduct, setSelectedProduct] = useState(null);
  let [isProductOpen, setIsProductOpen] = useState(false);

  const openProduct = (product) => {
    console.log(`Producto abierto ${product.name}`);
    setSelectedProduct(product);
    setIsProductOpen(true);
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
    selectedCategory,
    selectedName,
    selectedColor,
    selectedCondition,
    selectedPriceRange,
  ]);

  return (
    <>
      {isProductOpen && selectedProduct ? (
        <Product
          {...selectedProduct}
          setIsProductOpen={setIsProductOpen}
          setCartList={setCartList}
          cartList={cartList}
          setterCartOpen={setterCartOpen}
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
                      <div className="flex-grow flex flex-col items-center justify-center">
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
