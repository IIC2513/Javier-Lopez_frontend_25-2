import toteBag from "../assets/totebag1.svg";
import matcha from "../assets/matcha.png";
import libro from "../assets/libro.png";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

const DEFAULT_ITEMS = [
	{
		title: "TOTE BAG",
		id: 1,
		icon: <img src={toteBag} alt="Tote Bag" className="h-[600px] w-[600px]" />,
		scale: 1.0,
		offsetY: "-100px",
	},
	{
		title: "MATCHA LATTE",
		id: 2,
		icon: <img src={matcha} alt="Matcha Latte" />,
		scale: 0.7,
		offsetY: "-80px",
	},
	{
		title: "LITERATURA",
		id: 3,
		icon: <img src={libro} alt="Libro Segundo Sexo" />,
		scale: 1.0,
		offsetY: "-80px",
	},
];

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

const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
	items = DEFAULT_ITEMS,
	autoplay = false,
	autoplayDelay = 3000,
	pauseOnHover = false,
	loop = true,
}) {
	const carouselItems = [...items, items[0]];
	const [currentIndex, setCurrentIndex] = useState(0);
	const x = useMotionValue(0);
	const [isHovered, setIsHovered] = useState(false);
	const containerRef = useRef(null);
	const [containerWidth, setContainerWidth] = useState(0);
	const [isResetting, setIsResetting] = useState(false);

	useEffect(() => {
		if (containerRef.current)
			setContainerWidth(containerRef.current.offsetWidth);
		const handleResize = () => {
			if (containerRef.current)
				setContainerWidth(containerRef.current.offsetWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (!pauseOnHover || !containerRef.current) return;
		const c = containerRef.current;
		const enter = () => setIsHovered(true);
		const leave = () => setIsHovered(false);
		c.addEventListener("mouseenter", enter);
		c.addEventListener("mouseleave", leave);
		return () => {
			c.removeEventListener("mouseenter", enter);
			c.removeEventListener("mouseleave", leave);
		};
	}, [pauseOnHover]);

	useEffect(() => {
		if (!autoplay || (pauseOnHover && isHovered)) return;
		const timer = setInterval(() => {
			setCurrentIndex((prev) => {
				if (prev === carouselItems.length - 1) return 0;
				return prev + 1;
			});
		}, autoplayDelay);
		return () => clearInterval(timer);
	}, [autoplay, autoplayDelay, isHovered, pauseOnHover, carouselItems.length]);

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
		if (offset < -50)
			setCurrentIndex((prev) =>
				prev === carouselItems.length - 1 ? 0 : prev + 1
			);
		else if (offset > 50)
			setCurrentIndex((prev) =>
				prev === 0 ? carouselItems.length - 1 : prev - 1
			);
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
					let bgColor = "#FCA41D";
					if (index === 1) bgColor = "#839243";
					else if (index === 2) bgColor = "#fd538d";

					return (
						<div
							key={index}
							className="flex-shrink-0 w-screen h-screen flex flex-col justify-center items-center text-center px-8"
							style={{ backgroundColor: bgColor }}
						>
							<div
								className="flex flex-col items-center"
								style={{ transform: "translateY(120px)" }}
							>
								<div className="h-[400px] flex items-center justify-center">
									<span
										style={{
											transform: `translateY(${item.offsetY || 0}) scale(${
												item.scale || 1
											})`,
											transformOrigin: "center",
										}}
									>
										{item.icon}
									</span>
								</div>

								{(() => {
									const textStyle =
										itemTextStyles[index % itemTextStyles.length];
									return (
										<>
											<h2 className="mb-2 text-center" style={textStyle}>
												{item.title}
											</h2>
										</>
									);
								})()}
							</div>
						</div>
					);
				})}
			</motion.div>

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
