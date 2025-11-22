import { useRef, useState } from "react";

// Componente sacado de : https://reactbits.dev/components/spotlight-card
// y luego adaptado al proyecto

const SpotlightCard = ({
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.3)",
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
    setOpacity(0.7);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(0.7);
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
      className={`relative bg-linear-to-br from-[#2F5B61] via-[#246067] to-[#73568b] overflow-hidden 
      p-4 sm:p-8 w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl 
      h-64 sm:h-72 rounded-3xl border-2 border-[#966fb6] 
      shadow-xl hover:shadow-2xl 
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
        <div className="flex flex-col sm:flex-row items-center h-full sm:space-x-8 space-y-3 sm:space-y-0 font-sora px-2 sm:px-4">
          <img
            src={member.image}
            alt={member.nombre}
            className="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-[#9a74ba] shadow-lg shrink-0 mb-2 sm:mb-0"
          />

          <div className="flex flex-col justify-center text-center sm:text-left w-full">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#f6efe2] drop-shadow-lg mb-1"
              style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
            >
              {member.nombre}
            </h2>
            <h3
              className="text-lg sm:text-xl text-[#c1d4ee] font-semibold mb-2"
              style={{ fontFamily: "sora, sans-serif" }}
            >
              {member.title}
            </h3>
            <p
              className="text-sm sm:text-base text-[#f6efe2b7] leading-snug max-w-full sm:max-w-[95%]"
              style={{ fontFamily: "sora, sans-serif" }}
            >
              {member.description}
            </p>
          </div>
        </div>
      )}
      <div className="absolute bottom-3 right-3 hidden sm:flex items-center gap-2 opacity-80 sm:bottom-4 sm:right-6">
        <svg width="28" height="28" viewBox="0 0 16 16" fill="#f6efe2" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        <span className="text-[#f6efe2] text-sm font-sora">GitHub</span>
      </div>
    </div>
  );
};

export default SpotlightCard;
