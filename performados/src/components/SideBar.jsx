import React from "react";

const categories = [
  "Labubus",
  "Totebags",
  "Libros",
  "Matcha",
  "Discos",
  "Lentes",
  "Accesorios",
];

function SideBar() {
  return (
    <aside
      className="w-full max-w-lg p-4 rounded-2xl space-y-6 mt-4 "
      style={{
        fontFamily: "sora, sans-serif",
      }}
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar"
          className="w-full py-3 pl-4 pr-10 bg-[#FBF6EF] rounded-xl border-none focus:ring-2 focus:ring-gray-400 outline-none placeholder:font-semibold"
        />
        <div className="absolute top-1/2 right-4 -translate-y-1/2"></div>
      </div>

      <div>
        <ul className="space-y-4 pl-2">
          {categories.map((category) => (
            <li key={category} className="flex items-center">
              <input
                id={`category-${category}`}
                name="category"
                type="checkbox"
                className="h-5 w-5 rounded border-gray-400 text-gray-900 focus:ring-gray-500"
              />
              <label
                htmlFor={`category-${category}`}
                className="ml-3 font-semibold text-gray-700"
              >
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center pl-96">
        <button className=" bg-[#26484d] text-white font-bold py-1.5 px-6 rounded-xl hover:bg-gray-700 transition-colors">
          Search
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
