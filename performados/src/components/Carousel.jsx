import toteBag from "../assets/totebag1.svg";
import matcha from "../assets/matcha.png";
import libro from "../assets/libro.png";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import AnimatedContent from "./animacion";
import CircleRevealStyle from "./circulito";
import React from "react";

const DEFAULT_ITEMS = [
	{
		title: "TOTE BAG",
		id: 1,
		icon: (
			<img
				src={toteBag}
				alt="Tote Bag"
				className="h-[40vh] lg:h-[45vh] w-auto object-contain" // Más grande
			/>
		),
		scale: 1.5,
		offsetY: "-10vh",
		color: "#FCA41D",
		textColor: "#2F5B61",
	},
	{
		title: "MATCHA LATTE",
		id: 2,
		icon: (
			<img
				src={matcha}
				alt="Matcha Latte"
				className="h-[40vh] lg:h-[45vh] w-auto object-contain" // Más grande
			/>
		),
		scale: 1,
		offsetY: "-10vh",
		color: "#839243",
		textColor: "#FFFFFF",
	},
	{
		title: "LITERATURA",
		id: 3,
		icon: (
			<img
				src={libro}
				alt="Libro Segundo Sexo"
				className="h-[40vh] lg:h-[45vh] w-auto object-contain" // Ajustado
			/>
		),
		scale: 1.0,
		offsetY: "-10vh",
		color: "#fd538d",
		textColor: "#FFFFFF",
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

export default function Carousel({
	items = DEFAULT_ITEMS,
	autoplay = false,
	autoplayDelay = 5000,
	pauseOnHover = false,
}) {
	const carouselItems = [...items, items[0]];
	const [currentIndex, setCurrentIndex] = useState(0);
	const prevCurrentIndex = usePrevious(currentIndex) ?? 0;

	const x = useMotionValue(0);
	const [isHovered, setIsHovered] = useState(false);
	const containerRef = useRef(null);
	const [containerWidth, setContainerWidth] = useState(0);
	const [isResetting, setIsResetting] = useState(false);

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

	const activeIndex = currentIndex % items.length;
	const prevActiveIndex = prevCurrentIndex % items.length;

	const baseBgColor =
		items[prevActiveIndex]?.color || items[items.length - 1].color;

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
										<div className="h-auto flex items-center justify-center">
											<span
												className="flex justify-center items-center"
												style={{
													transform: `translateY(${item.offsetY || 0}) scale(${
														item.scale || 1
													})`,
													transformOrigin: "center",
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
											className="mb-2 text-center leading-tight"
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
1;
