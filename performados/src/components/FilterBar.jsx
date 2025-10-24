import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState, useRef } from "react";

function FilterBar({
  setterPriceRange,
  setterCondition,
  setterSort,
  setterColor,
  setterName,
}) {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="filter-bar flex gap-4 pt-0.5 px-2 mt-1 items-center justify-between overflow-x-auto ">
      <div
        onClick={() => setOpenSearch(!openSearch)}
        className="bg-[#2e6167]  rounded-full w-8 h-8  flex items-center justify-center  hover:cursor-pointer hover:bg-[#366f78] "
      >
        <FaMagnifyingGlass className="inline-block  text-[#f6efe2] w-3 sm:w-1.5 md:w-2 lg:w-3" />
      </div>
      {openSearch && (
        <div className=" text-sm md:text-sm lg:text-sm p-1 rounded-full bg-[#e3dbc8a3] ">
          <input
            className=" text-[#2e5b61] text-xs md:text-sm lg:text-sm p-1 focus:outline-none size-max w-20 md:w-25 lg:w-35 "
            type="text"
            placeholder="Quiero..."
            onChange={(e) => setterName(e.target.value)}
            style={{
              fontFamily: "sora, sans-serif",
            }}
          />
        </div>
      )}

      <div
        className="filtros flex gap-4  m-auto mr-5 text-xs md:text-sm lg:text-sm  text-[#2e5b61] "
        style={{
          fontFamily: "sora, sans-serif",
        }}
      >
        <div className="filter-item hover:cursor-pointer ">Ordenar ▾</div>
        <div className="filter-item hover:cursor-pointer ">Color ▾</div>
        <div className="filter-item hover:cursor-pointer ">Condicion ▾</div>
        <div className="filter-item hover:cursor-pointer ">Precio ▾</div>
      </div>
    </div>
  );
}

export default FilterBar;
