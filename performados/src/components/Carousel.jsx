import toteBag from "../assets/totebag1.svg";
import matcha from "../assets/matcha.png";
import libro from "../assets/libro.png";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import AnimatedContent from "./animacion";
import CircleRevealStyle from "./circulito";
import React from "react";
import { useNavigate } from "react-router-dom";

// Datos por defecto del carrusel
const DEFAULT_ITEMS = [
    {
        title: "TOTE BAG",
        id: 1,
        path: "/products/totebags", 
        icon: (
            <img
                src={toteBag}
                alt="Tote Bag"
                className="h-[40vh] lg:h-[45vh] w-auto object-contain"
            />
        ),
        scale: 1.5,
        offsetY: "-10vh",
        color: "#FCA41D",
        textColor: "#2F5B61",
        starColor: "#cc8417" // Color de las estrellas más oscuro
    },
    {
        title: "MATCHA LATTE",
        id: 2,
        path: "/products/matcha", 
        icon: (
            <img
                src={matcha}
                alt="Matcha Latte"
                className="h-[40vh] lg:h-[45vh] w-auto object-contain"
            />
        ),
        scale: 1,
        offsetY: "-10vh",
        color: "#839243",
        textColor: "#FFFFFF",
        starColor: "#6a7635" // Color de las estrellas más oscuro
    },
    {
        title: "LITERATURA",
        id: 3,
        path: "/products/libros", 
        icon: (
            <img
                src={libro}
                alt="Libro Segundo Sexo"
                className="h-[40vh] lg:h-[45vh] w-auto object-contain"
            />
        ),
        scale: 1.0,
        offsetY: "-10vh",
        color: "#fd538d",
        textColor: "#FFFFFF",
        starColor: "#c9426f" // Color de las estrellas más oscuro
    },
];

const SPRING_OPTIONS = { type: "spring", stiffness: 200, damping: 30 };

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};

// Componente para las estrellas
const Star = ({ color, style, delay }) => (
  <motion.div
    initial={{ scale: 1, opacity: 0, x: 0, y: 0 }}
    animate={{ scale: 3, opacity: 1, ...style }}
    exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
    transition={{ 
      duration: 0.8,
      delay: delay,
      type: "spring",
      stiffness: 100
    }}
    className="absolute z-20"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  </motion.div>
);

export default function Carousel({
    items = DEFAULT_ITEMS,
    autoplay = false,
    autoplayDelay = 5000,
    pauseOnHover = false,
}) {
    const navigate = useNavigate();
    
    const carouselItems = [...items, items[0]];
    const [currentIndex, setCurrentIndex] = useState(0);
    const prevCurrentIndex = usePrevious(currentIndex) ?? 0;

    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isResetting, setIsResetting] = useState(false);
    
    const [dragStartX, setDragStartX] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        if (!autoplay || (pauseOnHover && isHovered)) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
        }, autoplayDelay);
        return () => clearInterval(timer);
    }, [
        autoplay,
        autoplayDelay,
        isHovered,
        pauseOnHover,
        carouselItems.length,
        currentIndex,
    ]);

    const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationComplete = () => {
        if (currentIndex === carouselItems.length - 1) {
            setIsResetting(true);
            x.set(0);
            setCurrentIndex(0);
            setTimeout(() => setIsResetting(false), 50);
        }
    };

    const handleDragEnd = (_, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset < -50 || velocity < -500) {
            setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
        } else if (offset > 50 || velocity > 500) {
            setCurrentIndex(
                (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
            );
        }
    };

    const handleItemClick = (path) => {
        if (path) {
            navigate(path);
        }
    };

    const activeIndex = currentIndex % items.length;
    const prevActiveIndex = prevCurrentIndex % items.length;

    const baseBgColor =
        items[prevActiveIndex]?.color || items[items.length - 1].color;

    const starPositions = [
        { x: -200, y: -170, delay: 0.2, rotate: -15 },
        { x: 250, y: -190, delay: 0.3, rotate: 10 },
        { x: -280, y: 80, delay: 0.4, rotate: -18 },
        { x: 200, y: 160, delay: 0.5, rotate: 6 }
    ];

    return (
        <>
            <CircleRevealStyle />
            <div
                ref={containerRef}
                className="w-full h-screen sticky top-0  overflow-hidden bg-[#111]"
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
                        const isCurrentItem =
                            index === currentIndex ||
                            (index === 0 && currentIndex === carouselItems.length - 1);

                        return (
                            <div
                                key={index}
                                className="flex-shrink-0 w-screen h-screen relative"
                                style={{ backgroundColor: baseBgColor }}
                            >
                                <div
                                    style={{ backgroundColor: item.color }}
                                    className={`absolute top-0 left-0 w-full h-full z-[1] ${
                                        isCurrentItem ? "animate-circle-reveal" : ""
                                    }`}
                                />

                                <div className="flex flex-col items-center text-center px-8 w-full h-full absolute top-0 left-0 z-[10] pt-[30vh] pb-24">
                                    <div className="flex flex-col items-center">
                                        <div className="h-auto flex items-center justify-center relative">
                                            <AnimatePresence>
                                                {isCurrentItem && starPositions.map((pos, i) => (
                                                    <Star
                                                        key={i}
                                                        color={item.starColor}
                                                        style={{ x: pos.x, y: pos.y,rotate: pos.rotate }}
                                                        delay={pos.delay}
                                                    />
                                                ))}
                                            </AnimatePresence>
                                            <span
                                                className="flex justify-center items-center cursor-pointer relative z-50"
                                                style={{
                                                    transform: `translateY(${item.offsetY || 0}) scale(${
                                                        item.scale || 1
                                                    })`,
                                                    transformOrigin: "center",
                                                    pointerEvents: "auto"
                                                }}
                                                onPointerDown={(e) => setDragStartX(e.clientX)}
                                                onPointerUp={(e) => {
                                                    if (Math.abs(e.clientX - dragStartX) < 10) {
                                                        handleItemClick(item.path);
                                                    }
                                                }}
                                                onMouseEnter={() => setIsHovered(true)}
                                                onMouseLeave={() => setIsHovered(false)}
                                            >
                                                <AnimatedContent
                                                    key={activeIndex}
                                                    distance={350}
                                                    direction="vertical"
                                                    reverse={false}
                                                    duration={1.2}
                                                    ease="power3.out"
                                                    initialOpacity={0}
                                                    animateOpacity={true}
                                                    scale={item.scale || 1.0}
                                                    isFloating={true}
                                                    floatAmount={25}
                                                    floatDuration={3.5}
                                                >
                                                    {item.icon}
                                                </AnimatedContent>
                                            </span>
                                        </div>

                                        <h2
                                            className="mb-2 text-center leading-tight pointer-events-none"
                                            style={{
                                                fontFamily: "Anton, sans-serif",
                                                fontWeight: 800,
                                                letterSpacing: "3.49px",
                                                color: item.textColor,
                                                transform: "scaleX(0.8)",
                                                fontSize: "clamp(2.5rem, 10vw, 6rem)",
                                            }}
                                        >
                                            {item.title}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                                activeIndex === index ? "bg-white scale-125" : "bg-white/50"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}