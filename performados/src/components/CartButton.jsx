import React from "react";
import CartOnSide from "./CartOnSide";
import Carro from "../assets/Carro.png";

function CartButton({ setterCartOpen, isLogged, itemCount }) {
  return (
    <>
      {isLogged && (
        <div className="fixed bottom-5 right-5 z-50 ">
          <button
            onClick={() => setterCartOpen((prev) => !prev)}
            className="bg-[#2f5b61] text-white p-2 rounded-full shadow-lg hover:bg-[#507f79] transition-colors duration-300 hover:cursor-pointer"
            aria-label="Toggle Cart"
          >
            <img
              src={Carro}
              alt="carro"
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 hover:scale-120 transition-transform duration-300"
            />
          </button>
        </div>
      )}
    </>
  );
}

export default CartButton;
