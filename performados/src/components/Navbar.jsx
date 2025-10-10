import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";

// Para este componente se utilizó https://reactbits.dev/components/card-nav y se modifico acorde al mockup
// Se utilizó chatgpt, para ayudar con partes complejas

const NavBar = ({
	logo,
	logoAlt = "Logo",
	items,
	className = "",
	ease = "power3.out",
	baseColor = "#f6efe2",
	menuColor,
	buttonBgColor,
	buttonTextColor,
}) => {
	const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const navRef = useRef(null);
	const cardsRef = useRef([]);
	const tlRef = useRef(null);

	const calculateHeight = () => {
		const navEl = navRef.current;
		if (!navEl) return 260;

		const isMobile = window.matchMedia("(max-width: 768px)").matches;
		if (isMobile) {
			const contentEl = navEl.querySelector(".card-nav-content");
			if (contentEl) {
				const wasVisible = contentEl.style.visibility;
				const wasPointerEvents = contentEl.style.pointerEvents;
				const wasPosition = contentEl.style.position;
				const wasHeight = contentEl.style.height;

				contentEl.style.visibility = "visible";
				contentEl.style.pointerEvents = "auto";
				contentEl.style.position = "static";
				contentEl.style.height = "auto";

				contentEl.offsetHeight;

				const topBar = 60;
				const padding = 16;
				const contentHeight = contentEl.scrollHeight;

				contentEl.style.visibility = wasVisible;
				contentEl.style.pointerEvents = wasPointerEvents;
				contentEl.style.position = wasPosition;
				contentEl.style.height = wasHeight;

				return topBar + contentHeight + padding;
			}
		}
		return 260;
	};

	const createTimeline = () => {
		const navEl = navRef.current;
		if (!navEl) return null;

		gsap.set(navEl, { height: 80, overflow: "hidden" });
		gsap.set(cardsRef.current, { y: 50, opacity: 0 });

		const tl = gsap.timeline({ paused: true });

		tl.to(navEl, {
			height: calculateHeight,
			duration: 0.4,
			ease,
		});

		tl.to(
			cardsRef.current,
			{ y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
			"-=0.1"
		);

		return tl;
	};

	useLayoutEffect(() => {
		const tl = createTimeline();
		tlRef.current = tl;

		return () => {
			tl?.kill();
			tlRef.current = null;
		};
	}, [ease, items]);

	useLayoutEffect(() => {
		const handleResize = () => {
			if (!tlRef.current) return;

			if (isExpanded) {
				const newHeight = calculateHeight();
				gsap.set(navRef.current, { height: newHeight });

				tlRef.current.kill();
				const newTl = createTimeline();
				if (newTl) {
					newTl.progress(1);
					tlRef.current = newTl;
				}
			} else {
				tlRef.current.kill();
				const newTl = createTimeline();
				if (newTl) {
					tlRef.current = newTl;
				}
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [isExpanded]);

	const toggleMenu = () => {
		const tl = tlRef.current;
		if (!tl) return;
		if (!isExpanded) {
			setIsHamburgerOpen(true);
			setIsExpanded(true);
			tl.play(0);
		} else {
			setIsHamburgerOpen(false);
			tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
			tl.reverse();
		}
	};

	const setCardRef = (i) => (el) => {
		if (el) cardsRef.current[i] = el;
	};

	return (
		<div
			className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[92%] z-[99] top-[1.2em] md:top-[2em] ${className}`}
		>
			<nav
				ref={navRef}
				className={`card-nav ${
					isExpanded ? "open" : ""
				} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]`}
				style={{ backgroundColor: baseColor }}
			>
				<div className="card-nav-top absolute inset-x-0 top-0 h-[80px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
					<div className="hidden md:flex items-center gap-6 order-0">
						<a
							href="#"
							className="text-[#2f5b61] font-sora text-lg hover:underline cursor-pointer"
							onClick={toggleMenu}
							style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
						>
							Products ▾
						</a>
						<a
							href="/about-us"
							className="text-[#2f5b61] font-sora text-lg hover:underline cursor-pointer"
							style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
						>
							About Us
						</a>
						<a
							href="/"
							className="text-[#2f5b61] font-sora text-lg hover:underline cursor-pointer"
							style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
						>
							Search 🔍
						</a>
					</div>

					<div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
						<a href="/" className="cursor-pointer">
							<h1
								className="text-[50px] tracking-tight"
								style={{
									fontFamily: "MidnightGelactic, sans-serif",
									color: "#2f5b61",
								}}
							>
								Performados
							</h1>
						</a>
					</div>

					<div className="hidden md:flex items-center gap-3 order-3 ml-auto mr-4">
						<button
							type="button"
							className="rounded-lg px-10 py-3 font-sora transition-colors duration-300 bg-[#2f5b61] text-xl text-white hover:opacity-90"
							style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
						>
							Login
						</button>
						<button
							type="button"
							className="rounded-lg px-8 py-3 font-sora transition-colors duration-300 border border-[#2f5b61] text-[#2f5b61] text-xl hover:bg-[#2f5b61] hover:text-white"
							style={{
								fontFamily: "sora, sans-serif",
								fontWeight: "bolder",
							}}
						>
							Register
						</button>
					</div>
				</div>

				<div
					className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
						isExpanded
							? "visible pointer-events-auto"
							: "invisible pointer-events-none"
					} md:flex-row md:items-end md:gap-[12px]`}
					aria-hidden={!isExpanded}
				>
					{(items || []).slice(0, 3).map((item, idx) => (
						<div
							key={`${item.label}-${idx}`}
							className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
							ref={setCardRef(idx)}
							style={{
								backgroundColor: item.bgColor,
								color: item.textColor,
								fontFamily: item.fontFamily || "inherit",
							}}
						>
							<div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
								{item.label}
							</div>
							<div className="nav-card-links mt-auto flex flex-col gap-[2px]">
								{item.links?.map((lnk, i) => (
									<a
										key={`${lnk.label}-${i}`}
										className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
										href={lnk.href}
										aria-label={lnk.ariaLabel}
									>
										<GoArrowUpRight
											className="nav-card-link-icon shrink-0"
											aria-hidden="true"
										/>
										{lnk.label}
									</a>
								))}
							</div>
						</div>
					))}
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
