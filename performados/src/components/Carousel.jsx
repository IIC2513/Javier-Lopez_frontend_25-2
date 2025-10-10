import toteBag from "../assets/totebag1.svg";
import matcha from "../assets/matcha.png";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import { FiCircle, FiLayers } from "react-icons/fi";

// El codigo base para este componente es: https://reactbits.dev/components/carousel
// Las partes complejas se arreglaron con ChatGPT

const DEFAULT_ITEMS = [
  {
    title: "TOTE BAG",
    id: 1,
    icon: <img src={toteBag} alt="Tote Bag" className="h-[600px] w-[600px]" />,
  },
  {
    title: "MATCHA LATTE",
    id: 2,
    icon: (
      <img src={matcha} alt="Matcha Latte" className="h-[200px] w-[200px]" />
    ),
  },
  {
    title: "LITERATURA",
    id: 3,
    icon: <FiLayers className="h-12 w-12 text-white" />,
  },
];

// Estilos de texto para los items
const itemTextStyles = [
  {
    fontFamily: "Anton, sans-serif",
    fontSize: "100.34px",
    fontWeight: 800,
    lineHeight: "156.79px",
    letterSpacing: "3.49px",
    color: "#2F5B61",
    transform: "scaleX(0.8)",
  },
  {
    fontFamily: "Anton, sans-serif",
    fontSize: "100.34px",
    fontWeight: 800,
    lineHeight: "156.79px",
    letterSpacing: "3.49px",
    color: "#FFFFFF",
    transform: "scaleX(0.8)",
  },
  {
    fontFamily: "Anton, sans-serif",
    fontSize: "100.34px",
    fontWeight: 800,
    lineHeight: "156.79px",
    letterSpacing: "3.49px",
    color: "#FFFFFF",
    transform: "scaleX(0.8)",
  },
];

const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
}) {
  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const containerRef = useRef(null);

  // Nuevo hook
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hover
  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;
    const container = containerRef.current;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    container.addEventListener("mouseenter", enter);
    container.addEventListener("mouseleave", leave);
    return () => {
      container.removeEventListener("mouseenter", enter);
      container.removeEventListener("mouseleave", leave);
    };
  }, [pauseOnHover]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || (pauseOnHover && isHovered)) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === items.length - 1 && loop) return prev + 1;
        if (prev === carouselItems.length - 1) return loop ? 0 : prev;
        return prev + 1;
      });
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setTimeout(() => {
        setIsResetting(true);
        x.jump(0); // salto instantáneo sin transición visible
        setCurrentIndex(0);
        setIsResetting(false);
      }, 10);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    if (offset < -50)
      setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
    else if (offset > 50) setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen absolute top-0 left-0 overflow-hidden bg-[#111]"
    >
      <motion.div
        className="flex h-full"
        drag="x"
        dragConstraints={{
          left: -containerWidth * (carouselItems.length - 1),
          right: 0,
        }}
        style={{ x }}
        onDragEnd={handleDragEnd}
        animate={{ x: -currentIndex * containerWidth }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          let bgColor = "#FCA41D"; // item 1
          if (index === 1) bgColor = "#839243"; // item 2
          else if (index === 2) bgColor = "#fd538d"; // item 3

          return (
            <div
              key={index}
              className="flex-shrink-0 w-screen h-screen flex flex-col justify-center items-center text-center px-8"
              style={{ backgroundColor: bgColor }}
            >
              {/* Imagen bajada solo en el primer item */}
              <span
                className="mb-4"
                style={{ marginTop: index === 0 ? "100px" : "0px" }}
              >
                {item.icon}
              </span>

              {/* Título con la fuente y escala Anton */}
              <h2 className="mb-2 text-center" style={itemTextStyles[index]}>
                {item.title}
              </h2>

              {/* Descripción con misma fuente */}
              <p
                className="text-center"
                style={{
                  fontFamily: itemTextStyles[index]?.fontFamily,
                  color: itemTextStyles[index]?.color,
                  fontSize: "32px",
                  lineHeight: "48px",
                  letterSpacing: "1.5px",
                }}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </motion.div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {items.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 w-3 rounded-full cursor-pointer transition-colors ${
              currentIndex % items.length === idx ? "bg-white" : "bg-gray-600"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
