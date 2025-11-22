import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";

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

function FilterBar({
  setterPriceRange,
  setterCondition,
  setterSort,
  setterColor,
  setterName,
  availableColors = ["black", "white", "green", "pink", "blue", "brown"],
}) {
  const [openSearch, setOpenSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [color, setColor] = useState("any");
  const [condition, setCondition] = useState("any");
  const [priceRange, setPriceRange] = useState("any");
  const inputRef = useRef(null);

  useEffect(() => {
    setterName?.(query || null);
  }, [query, setterName]);

  useEffect(() => {
    setterColor?.(color === "any" ? null : color);
  }, [color, setterColor]);

  useEffect(() => {
    setterCondition?.(condition === "any" ? null : condition);
  }, [condition, setterCondition]);

  useEffect(() => {
    setterPriceRange?.(priceRange === "any" ? null : priceRange);
  }, [priceRange, setterPriceRange]);

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="filter-bar flex gap-4 pt-0.5 pl-4 px-2 mt-1 items-center justify-between overflow-x-auto ">
      <div
        onClick={() => setOpenSearch(!openSearch)}
        className="bg-[#2e6167]  rounded-full w-8 h-8 flex items-center justify-center hover:cursor-pointer hover:bg-[#366f78] "
      >
        <FaMagnifyingGlass className="inline-block  text-[#f6efe2] w-10 sm:w-4 md:w-4 lg:w-4" />
      </div>
      {openSearch && (
        <div className=" text-sm md:text-sm lg:text-sm p-1 rounded-full bg-[#e3dbc8a3] ">
          <input
            id="product-search"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className=" text-[#2e5b61] text-xs md:text-sm lg:text-sm p-1 focus:outline-none size-max w-20 md:w-25 lg:w-35 "
            type="text"
            placeholder="Quiero..."
            style={{
              fontFamily: "sora, sans-serif",
            }}
          />
        </div>
      )}
      {query ? (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Limpiar búsqueda"
          className="pr-3 pl-2 py-2 text-[#2e5b61] flex items-center justify-center hover:bg-[#f3f1ee] transition rounded-full"
        ></button>
      ) : (
        <div className="pr-3 pl-2 py-2" />
      )}

      <div
        className="filtros flex gap-4  m-auto mr-5 text-xs md:text-sm lg:text-sm  text-[#2e5b61] "
        style={{
          fontFamily: "sora, sans-serif",
        }}
      >
        <div className="filter-item hover:cursor-pointer ">
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="px-3 py-1 rounded-full bg-[#2e6167] text-sm text-[#f6efe2] shadow-sm appearance-none hover:cursor-pointer hover:bg-[#366f78] "
          >
            <option value="any">Color</option>
            {colorOptions
              .filter((option) => availableColors.includes(option.value) || option.value === "default")
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </div>
        <div className="filter-item hover:cursor-pointer ">
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="px-3 py-1 rounded-full bg-[#2e6167] text-sm text-[#f6efe2] shadow-sm appearance-none hover:cursor-pointer hover:bg-[#366f78] "
          >
            <option value="any">Condición</option>
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
          </select>
        </div>
        <div className="filter-item hover:cursor-pointer ">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className=" px-3 py-1 rounded-full bg-[#2e6167] text-sm text-[#f6efe2] shadow-sm appearance-none hover:cursor-pointer hover:bg-[#366f78] "
          >
            <option value="any">Precio</option>
            <option value="under-20000">Menos de $20.000</option>
            <option value="20000-40000">20.000 - $40.000</option>
            <option value="over-40000">Más de $40.000</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
