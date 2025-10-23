import React, { useMemo, useState, useEffect } from "react";
import PillNav from "../components/ProductBar";

import toteBagClairo from "../assets/Totebag-Clairo.png";
import toteBagLaufey from "../assets/Totebag-Laufey.png";
import labubu from "../assets/labubu-1.png";
import labubu2 from "../assets/labubu-2.png";
import labubu3 from "../assets/labubu-3.png";
import CategoryBar from "../components/CategoryBar";

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
    categoryId: 2,
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
    categoryId: 2,
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
    categoryId: 2,
    condition: "nuevo",
    image: labubu,
    description: "Producto oficial de la pagina",
    isOfficial: true,
    isActive: true,
    name: "Labubu 1",
    price: 29990,
    stock: 20,
  },

  {
    id: 11,
    OwnerId: 1,
    categoryId: 4,
    condition: "nuevo",
    image: "placeholder_libro_simone.png",
    description: "Ensayo fundamental del feminismo",
    isOfficial: false, // Es un producto de un tercero
    isActive: true,
    name: "El Segundo Sexo - Simone de Beauvoir",
    price: 22990,
    stock: 25,
  },
  {
    id: 12,
    OwnerId: 1,
    categoryId: 4,
    condition: "nuevo",
    image: "placeholder_libro_didion.png",
    description: "Memorias sobre el duelo y la vida",
    isOfficial: false,
    isActive: true,
    name: "Libro 'El Año del Pensamiento Mágico' - Joan Didion",
    price: 18990,
    stock: 15,
  },
  {
    id: 13,
    OwnerId: 1,
    categoryId: 4,
    condition: "nuevo",
    image: "placeholder_libro_rooney.png",
    description: "Novela contemporánea sobre la conexión",
    isOfficial: false,
    isActive: true,
    name: "Libro 'Gente Normal' - Sally Rooney",
    price: 19990,
    stock: 30,
  },
  {
    id: 14,
    OwnerId: 1,
    categoryId: 4,
    condition: "nuevo",
    image: "placeholder_libro_moshfegh.png",
    description: "Novela de culto sobre la alienación",
    isOfficial: false,
    isActive: true,
    name: "Libro 'Mi Año de Descanso y Relajación' - Ottessa Moshfegh",
    price: 21990,
    stock: 10,
  },

  // Categoría 5: Matcha y Bebidas
  {
    id: 15,
    OwnerId: 1,
    categoryId: 5,
    condition: "nuevo",
    image: "placeholder_matcha_kit.png",
    description: "Kit completo para preparar matcha ceremonial",
    isOfficial: true,
    isActive: true,
    name: "Kit Ceremonial de Matcha (Bowl, Chasen, Cuchara)",
    price: 39990,
    stock: 18,
  },
  {
    id: 16,
    OwnerId: 1,
    categoryId: 5,
    condition: "nuevo",
    image: "placeholder_matcha_polvo.png",
    description: "30g de matcha grado ceremonial de Uji, Japón",
    isOfficial: true,
    isActive: true,
    name: "Polvo de Matcha Ceremonial",
    price: 18990,
    stock: 40,
  },
  {
    id: 17,
    OwnerId: 1,
    categoryId: 5,
    condition: "nuevo",
    image: "placeholder_cafe_grano.png",
    description: "250g de café de especialidad, origen único",
    isOfficial: false,
    isActive: true,
    name: "Café de Grano de Especialidad (Etiopía)",
    price: 14990,
    stock: 20,
  },

  // Categoría 6: Accesorios y Estilo de Vida
  {
    id: 18,
    OwnerId: 1,
    categoryId: 6,
    condition: "nuevo",
    image: "placeholder_camara_polaroid.png",
    description: "Cámara instantánea moderna con look retro",
    isOfficial: false,
    isActive: true,
    name: "Cámara Polaroid Now (Blanco)",
    price: 129990,
    stock: 8,
  },
  {
    id: 19,
    OwnerId: 1,
    categoryId: 6,
    condition: "nuevo",
    image: "placeholder_camara_desechable.png",
    description: "Cámara de un solo uso con flash, 27 exposiciones",
    isOfficial: false,
    isActive: true,
    name: "Cámara Análoga Desechable",
    price: 16990,
    stock: 30,
  },
  {
    id: 20,
    OwnerId: 1,
    categoryId: 6,
    condition: "nuevo",
    image: "placeholder_audifonos_cable.png",
    description: "Audífonos alámbricos con estética retro 'coquette'",
    isOfficial: false,
    isActive: true,
    name: "Audífonos Alámbricos Retro (Plata)",
    price: 12990,
    stock: 50,
  },
  {
    id: 21,
    OwnerId: 1,
    categoryId: 6,
    condition: "nuevo",
    image: "placeholder_vela.png",
    description: "Vela de soya aromática (Sándalo y Vainilla)",
    isOfficial: true,
    isActive: true,
    name: "Vela Aromática 'Cozy'",
    price: 14990,
    stock: 22,
  },
  {
    id: 22,
    OwnerId: 1,
    categoryId: 6,
    condition: "nuevo",
    image: "placeholder_sunset_lamp.png",
    description: "Proyector de luz que simula un atardecer",
    isOfficial: false,
    isActive: true,
    name: "Lámpara Proyector de Atardecer",
    price: 11990,
    stock: 15,
  },
  {
    id: 23,
    OwnerId: 1,
    categoryId: 6,
    condition: "nuevo",
    image: "placeholder_moleskine.png",
    description: "Cuaderno clásico de tapa dura para journaling",
    isOfficial: false,
    isActive: true,
    name: "Cuaderno Moleskine Clásico (Negro)",
    price: 20990,
    stock: 17,
  },

  // Añadiendo más a tus categorías originales
  {
    id: 24,
    OwnerId: 1,
    categoryId: 1, // Totebags
    condition: "nuevo",
    image: "placeholder_totebag_mitski.png",
    description: "Totebag de algodón grueso",
    isOfficial: true,
    isActive: true,
    name: "Totebag 'Be the Cowboy' - Mitski",
    price: 17990,
    stock: 20,
  },
  {
    id: 25,
    OwnerId: 1,
    categoryId: 2, // Labubus
    condition: "nuevo",
    image: "placeholder_labubu_macaron.png",
    description: "Figura coleccionable, serie Macaron (Blind Box)",
    isOfficial: true,
    isActive: true,
    name: "Labubu 'The Monsters' Macaron (Blind Box)",
    price: 12990,
    stock: 40,
  },
  {
    id: 26,
    OwnerId: 1,
    categoryId: 1, // Totebags
    condition: "nuevo",
    image: "placeholder_totebag_lana.png",
    description: "Totebag oficial 'LDR'",
    isOfficial: true,
    isActive: true,
    name: "Totebag Logo Lana Del Rey",
    price: 19990,
    stock: 10,
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

const Products = () => {
  let [selectedCategory, setSelectedCategory] = useState(null);
  let [selectedPriceRange, setSelectedPriceRange] = useState(null);
  let [selectedCondition, setSelectedCondition] = useState(null);
  let [selectedSortOption, setSelectedSortOption] = useState(null);
  let [selectedColor, setSelectedColor] = useState(null);
  let [selectedName, setSelectedName] = useState(null);
  let [filteredProducts, setFilteredProducts] = useState(products_fetched);

  useEffect(() => {
    let products = products_fetched;
    if (selectedCategory) {
      console.log("Filtrando por categoría:", selectedCategory);
      const newFilteredList = products.filter(
        (product) => product.categoryId === categories[selectedCategory]
      );
      setFilteredProducts(newFilteredList);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, categories, products_fetched]);

  return (
    <div className="min-h-screen bg-[#efe6d2]">
      <div className="flex flex-col">
        <div className="bg-[#2e5b61] text-[#efe6d2] shadow-md pt-20 pb-10 sm:py-20 md:py-20 lg:pt-25 lg:pb-10 px-4">
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
          <div className="Barra-Filtros">
            <CategoryBar
              currentCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>
          <div className="Products container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#e7dcc775]  p-4 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-shadow duration-300"
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
                      className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold mb-2 text-[#26484d]"
                      style={{
                        fontFamily: "sora, sans-serif",
                      }}
                    >
                      {product.name}
                    </h2>
                    <p
                      className="text-base sm:text-lg md:text-lg lg:text-lg text-[#2e5b61]"
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
