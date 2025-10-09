// src/components/HeroCarousel.jsx
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: "Potencia tu Productividad",
    description:
      "Herramientas inteligentes para maximizar tu eficiencia y resultados",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    bgColor: "from-blue-600 to-purple-700",
    textColor: "text-white",
    navColor: "bg-white/10 backdrop-blur-md text-white",
  },
  {
    id: 2,
    title: "Colaboración Sin Límites",
    description:
      "Trabaja en equipo sin fronteras con nuestra plataforma integrada",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    bgColor: "from-emerald-600 to-cyan-700",
    textColor: "text-white",
    navColor: "bg-white/10 backdrop-blur-md text-white",
  },
  {
    id: 3,
    title: "Analytics en Tiempo Real",
    description: "Toma decisiones basadas en datos actualizados al instante",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    bgColor: "from-orange-600 to-red-700",
    textColor: "text-white",
    navColor: "bg-white/10 backdrop-blur-md text-white",
  },
];

const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;

export default function HeroCarousel({ onSlideChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const autoplayRef = useRef(null);

  const x = useMotionValue(0);
  const containerRef = useRef(null);

  const currentItem = CAROUSEL_ITEMS[currentIndex];

  // Autoplay cuando no se está arrastrando
  useEffect(() => {
    if (isDragging) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
      return;
    }

    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    autoplayRef.current = setInterval(() => {
      goToSlide((currentIndex + 1) % CAROUSEL_ITEMS.length);
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [currentIndex, isDragging]);

  // Notificar cambio de slide
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentItem);
    }
  }, [currentIndex, onSlideChange, currentItem]);

  const goToSlide = (index) => {
    const newIndex = Math.max(0, Math.min(index, CAROUSEL_ITEMS.length - 1));
    setCurrentIndex(newIndex);
    animate(x, -newIndex * 100, { duration: 0.5 });
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_, info) => {
    setIsDragging(false);

    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      // Swipe izquierda - siguiente slide
      goToSlide(currentIndex + 1);
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      // Swipe derecha - slide anterior
      goToSlide(currentIndex - 1);
    } else {
      // Volver a la posición actual
      animate(x, -currentIndex * 100, { duration: 0.3 });
    }
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      ref={containerRef}
    >
      {/* Fondo gradiente dinámico */}
      <motion.div
        key={currentIndex}
        className={`absolute inset-0 bg-gradient-to-br ${currentItem.bgColor} transition-all duration-1000`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Contenedor del carousel con drag */}
      <motion.div
        className="relative h-full w-full cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -100 * (CAROUSEL_ITEMS.length - 1), right: 0 }}
        dragElastic={0.2}
        style={{ x }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Slides */}
        {CAROUSEL_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{
              left: `${index * 100}%`,
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Contenido del slide */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
              <motion.h1
                className={`text-5xl md:text-7xl font-bold mb-6 ${item.textColor}`}
                initial={{ y: 50, opacity: 0 }}
                animate={{
                  y: index === currentIndex ? 0 : 50,
                  opacity: index === currentIndex ? 1 : 0,
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {item.title}
              </motion.h1>

              <motion.p
                className={`text-xl md:text-2xl mb-8 ${item.textColor} opacity-90`}
                initial={{ y: 30, opacity: 0 }}
                animate={{
                  y: index === currentIndex ? 0 : 30,
                  opacity: index === currentIndex ? 1 : 0,
                }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {item.description}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{
                  y: index === currentIndex ? 0 : 30,
                  opacity: index === currentIndex ? 1 : 0,
                }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button className="bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 text-lg font-semibold shadow-lg">
                  Comenzar Ahora
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300 text-lg font-semibold">
                  Ver Demo
                </button>
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {CAROUSEL_ITEMS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Flechas de navegación */}
      <button
        onClick={() => goToSlide(currentIndex - 1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
        disabled={currentIndex === 0}
      >
        ‹
      </button>

      <button
        onClick={() => goToSlide(currentIndex + 1)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
        disabled={currentIndex === CAROUSEL_ITEMS.length - 1}
      >
        ›
      </button>

      {/* Indicador de drag (opcional) */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 text-white/70 text-sm"
        animate={{ opacity: isDragging ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        Arrastra para navegar
      </motion.div>
    </div>
  );
}
