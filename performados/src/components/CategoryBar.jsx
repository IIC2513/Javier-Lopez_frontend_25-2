import React from "react";
import book from "../assets/Component-Book.png";
import tote from "../assets/Component-Totebag.png";
import camera from "../assets/Component-Camera.png";
import disk from "../assets/Component-Disk.png";
import labubu from "../assets/Component-Labubu.png";
import latte from "../assets/Component-Latte.png";

const category = [
  {
    Labubus: labubu,
  },
  {
    Discos: disk,
  },
  {
    Totebags: tote,
  },
  {
    Libros: book,
  },
  {
    Matcha: latte,
  },
  {
    Accesorios: camera,
  },
];

function CategoryBar({ currentCategory, onCategorySelect }) {
  return (
    <div className="bg-[#2e6167] shadow-md py-8">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-3 gap-4 md:flex md:justify-center md:space-x-6 md:overflow-x-auto">
          {category.map((category, index) => {
            const categoryName = Object.keys(category)[0];
            return (
              <div
                key={index}
                className="flex-shrink-0 w-30 text-center text-white"
                onClick={() => onCategorySelect(categoryName.toLowerCase())}
              >
                <div className="rounded-full bg-[#2e5b61] p-2 mx-auto w-15 h-15 md:w-15 md:h-15 lg:w-20 lg:h-20 flex items-center justify-center hover:bg-[#468b94] transition-colors duration-300">
                  <img
                    src={category[categoryName]}
                    alt={categoryName}
                    className="w-10 h-10 md:w-15 md:h-15 lg:w-15 lg:h-15 mx-auto mb-2 mt-2 object-contain hover:scale-120 transition-transform duration-300  "
                  />
                </div>
                <span
                  className="text-xs font-bold text-[#f6efe2] md:text-sm"
                  style={{ fontFamily: "sora, sans-serif" }}
                >
                  {categoryName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryBar;
