import React from "react";
import PillNav from "../components/ProductBar";
import SideBar from "../components/SideBar";

import toteBagClairo from "../assets/Totebag-Clairo.png";
import toteBagLaufey from "../assets/Totebag-Laufey.png";
import labubu from "../assets/labubu-1.png";
import labubu2 from "../assets/labubu-2.png";
import labubu3 from "../assets/labubu-3.png";

const Products = () => {
  // Hardcodeo de productos
  let products_fetched = [
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
      stock: 10,
    },
    {
      id: 3,
      OwnerId: 1,
      categoryId: 1,
      condition: "nuevo",
      image: labubu3,
      description: "Producto oficial de la pagina",
      isOfficial: true,
      isActive: true,
      name: "Labubu 3",
      price: 29990,
      stock: 20,
    },
    {
      id: 4,
      OwnerId: 1,
      categoryId: 1,
      condition: "nuevo",
      image: labubu2,
      description: "Producto oficial de la pagina",
      isOfficial: true,
      isActive: true,
      name: "Labubu 2",
      price: 39990,
      stock: 20,
    },
    {
      id: 5,
      OwnerId: 1,
      categoryId: 1,
      condition: "nuevo",
      image: labubu,
      description: "Producto oficial de la pagina",
      isOfficial: true,
      isActive: true,
      name: "Labubu 1",
      price: 29990,
      stock: 20,
    },
  ];

  const navItems = [
    { href: "/products/", label: "All Products" },
    { href: "/products/", label: "Ropa" },
    { href: "/products/", label: "Comida" },
    { href: "/products/", label: "Libros" },
  ];

  return (
    <div className="min-h-screen bg-[#efe6d2]">
      <div className="flex flex-col">
        <div className="bg-[#2e5b61] text-[#efe6d2] shadow-md py-10 sm:py-10 md:py-20 lg:py-30">
          <h2
            className=" text-sm font-bold text-center mt-15"
            style={{
              fontFamily: "sora, sans-serif",
            }}
          >
            Hora de performarte
          </h2>
          <h2
            className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-center "
            style={{
              fontFamily: "Anton, sans-serif",
            }}
          >
            SUMATE AL CAMBIO
          </h2>
        </div>

        <div className="flex justify-center space-x-6 px-4">
          <div className="Barra-Filtros flex-1">
            <SideBar />
          </div>
          <div className="Products container mx-auto px-4 py-8 flex-3">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {products_fetched.map((product) => (
                <div
                  key={product.id}
                  className=" rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex-grow flex flex-col items-center justify-center">
                    <div className="image-container mb-4 flex justify-center items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-50 md:h-50 lg:w-100 lg:h-100 object-contain"
                      />
                    </div>
                    <h2
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-[#26484d]"
                      style={{
                        fontFamily: "sora, sans-serif",
                      }}
                    >
                      {product.name}
                    </h2>
                    <p
                      className="text-base sm:text-lg "
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
  );
};

export default Products;
