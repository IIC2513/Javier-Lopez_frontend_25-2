import { useRef, useState } from "react";

// Componente sacado de : https://reactbits.dev/components/spotlight-card
// y luego adaptado al proyecto

const SpotlightCard = ({
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  member,
}) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(0.6);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      onClick={() => window.open(member.github, "_blank")}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative bg-[#2b555b] overflow-hidden 
      p-6 sm:p-8 w-full sm:w-4/5 lg:w-3/4 xl:w-2/3 
      h-48 sm:h-56 rounded-2xl 
      shadow-md hover:shadow-2xl 
      transform transition-transform duration-300 hover:scale-105 
      ${className}`}
      style={{ cursor: "pointer" }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {member && (
        <div className="flex items-center h-full space-x-6 font-sora px-4">
          {/* Imagen */}
          <img
            src={member.image}
            alt={member.nombre}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover flex-shrink-0"
          />

          {/* Texto */}
          <div className="flex flex-col justify-center text-left">
            <h2
              className="text-2xl font-bold text-[#f6efe2]"
              style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
            >
              {member.nombre}
            </h2>
            <h3
              className="text-lg text-[#f6efe2b7] font-semibold mb-2"
              style={{ fontFamily: "sora, sans-serif" }}
            >
              {member.title}
            </h3>
            <p
              className="text-sm text-[#f6efe29d] leading-snug max-w-[90%]"
              style={{ fontFamily: "sora, sans-serif" }}
            >
              {member.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotlightCard;
