import React, { useRef, useState } from "react";

export default function HowToUse() {
	const comprarRef = useRef(null);
	const venderRef = useRef(null);
	const privacidadRef = useRef(null);
	const terminosRef = useRef(null);
	const navRef = useRef(null);

	const [isNavOpen, setIsNavOpen] = useState(false);

	const scrollToSection = (ref) => {
		if (ref.current && navRef.current) {
			const navHeight = navRef.current.offsetHeight;

			const elementPosition =
				ref.current.getBoundingClientRect().top + window.scrollY;

			const offsetPosition = elementPosition - navHeight - 20;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	const handleMobileScroll = (ref) => {
		scrollToSection(ref);

		setTimeout(() => {
			setIsNavOpen(false);
		}, 300);
	};

	return (
		<div className="bg-[#f6efe2]">
			<header className="bg-[#FCA41D] py-32 md:py-40 shadow-lg pl-6 md:pl-28">
				<h1
					className="tracking-tight"
					style={{
						fontFamily: "MidnightGelactic, sans-serif",
						color: "#2F5B61",
						textAlign: "left",
						fontSize: "clamp(2.5rem, 10vw, 7rem)",
					}}
				>
					Cómo
					<br />
					funciona
					<br />
					performados
				</h1>
			</header>

			<nav
				ref={navRef}
				className="sticky top-0 z-50 bg-white shadow-md"
				style={{ fontFamily: "Anton, sans-serif" }}
			>
				<div className="hidden md:flex max-w-5xl mx-auto flex-wrap justify-center gap-6 md:gap-10 py-5 px-4">
					<a
						onClick={() => scrollToSection(comprarRef)}
						className="text-lg md:text-xl font-semibold text-gray-800 cursor-pointer transition-all duration-200 ease-in-out hover:underline hover:scale-110"
					>
						Por que nosotros?
					</a>
					<a
						onClick={() => scrollToSection(venderRef)}
						className="text-lg md:text-xl font-semibold text-gray-800 cursor-pointer transition-all duration-200 ease-in-out hover:underline hover:scale-110"
					>
						Caracteristicas generales
					</a>
					<a
						onClick={() => scrollToSection(privacidadRef)}
						className="text-lg md:text-xl font-semibold text-gray-800 cursor-pointer transition-all duration-200 ease-in-out hover:underline hover:scale-110"
					>
						Como comprar con nosotros
					</a>
					<a
						onClick={() => scrollToSection(terminosRef)}
						className="text-lg md:text-xl font-semibold text-gray-800 cursor-pointer transition-all duration-200 ease-in-out hover:underline hover:scale-110"
					>
						Privacidad
					</a>
				</div>

				<div className="md:hidden">
					<button
						onClick={() => setIsNavOpen(!isNavOpen)}
						className="w-full flex justify-center items-center gap-2 py-3 font-semibold text-lg text-gray-800"
					>
						{isNavOpen ? "Ocultar Secciones" : "Mostrar Secciones"}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2.5}
							stroke="currentColor"
							className={`w-4 h-4 transition-transform ${
								isNavOpen ? "rotate-180" : ""
							}`}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 8.25l-7.5 7.5-7.5-7.5"
							/>
						</svg>
					</button>

					{isNavOpen && (
						<div className="flex flex-col items-center gap-4 py-4 border-t border-gray-200">
							<a
								onClick={() => handleMobileScroll(comprarRef)}
								className="text-lg font-semibold text-gray-800 cursor-pointer"
							>
								Por que nosotros?
							</a>
							<a
								onClick={() => handleMobileScroll(venderRef)}
								className="text-lg font-semibold text-gray-800 cursor-pointer"
							>
								Caracteristicas generales
							</a>
							<a
								onClick={() => handleMobileScroll(privacidadRef)}
								className="text-lg font-semibold text-gray-800 cursor-pointer"
							>
								Como comprar con nosotros
							</a>
							<a
								onClick={() => handleMobileScroll(terminosRef)}
								className="text-lg font-semibold text-gray-800 cursor-pointer"
							>
								Privacidad
							</a>
						</div>
					)}
				</div>
			</nav>

			<main
				className="max-w-4xl mx-auto p-6 md:p-10"
				style={{ fontFamily: "Sora, sans-serif" }}
			>
				<section ref={comprarRef} id="comprar" className="py-20">
					<h2 className="text-4xl font-bold text-gray-900 mb-6">
						¿Por que nosotros?
					</h2>
					<ul className="list-disc list-outside pl-5 space-y-4 text-lg text-gray-700 leading-relaxed">
						<li>
							<strong>Enfoque Total en la Experiencia (UX/UI):</strong> A
							diferencia de otras plataformas, Performados está diseñado desde
							cero pensando en la comodidad y simplicidad. Nuestra prioridad
							absoluta es que el proceso, ya sea de compra o de venta, sea
							intuitivo y libre de frustraciones.
						</li>
						<li>
							<strong>Marketplace 100% Confiable:</strong> No solo facilitamos
							la venta, sino que la aseguramos. Contamos con un sistema de
							verificación de vendedores y un mecanismo de disputas justo,
							creando un ecosistema seguro tanto para el que compra como para el
							que vende.
						</li>
						<li>
							<strong>Facilidad de Venta para Todos:</strong> Hemos simplificado
							el proceso de subir productos al máximo. Nuestra plataforma ofrece
							herramientas intuitivas para que emprendedores y vendedores puedan
							gestionar su inventario, pedidos y ganancias sin necesidad de
							conocimientos técnicos.
						</li>
						<li>
							<strong>Comunicación Directa Vendedor-Comprador:</strong>{" "}
							Integramos un sistema de chat directo y seguro. Esto permite a los
							compradores resolver dudas sobre productos al instante y a los
							vendedores ofrecer un servicio al cliente personalizado,
							aumentando la confianza y las ventas.
						</li>
					</ul>
				</section>

				<section ref={venderRef} id="vender" className="py-20">
					<h2 className="text-4xl font-bold text-gray-900 mb-6">
						Caracteristicas generales
					</h2>
					<ul className="list-disc list-outside pl-5 space-y-4 text-lg text-gray-700 leading-relaxed">
						<li>
							<strong>Interfaz Amigable e Intuitiva:</strong> Navegar por
							Performados es sencillo. El diseño es limpio y está organizado
							para que encuentres exactamente lo que buscas en el menor tiempo
							posible.
						</li>
						<li>
							<strong>Proceso de Compra Optimizado:</strong> Hemos eliminado
							pasos innecesarios. El proceso de pago es transparente, rápido y
							se puede completar en pocos clics.
						</li>
						<li>
							<strong>Precios Competitivos:</strong> Al ser un marketplace,
							fomentamos una sana competencia. Esto se traduce en precios más
							bajos y una mayor variedad de ofertas para el comprador en
							comparación con una tienda única.
						</li>
						<li>
							<strong>Soporte al Cliente Ágil:</strong> Más allá del chat con
							vendedores, contamos con un equipo de soporte de la plataforma
							listo para ayudarte con cualquier incidencia general, pagos o
							dudas sobre el funcionamiento del sitio.
						</li>
						<li>
							<strong>Seguridad en Transacciones:</strong> Utilizamos pasarelas
							de pago reconocidas y encriptación de datos para garantizar que
							toda transacción monetaria y personal esté 100% protegida.
						</li>
					</ul>
				</section>

				<section ref={privacidadRef} id="privacidad" className="py-20">
					<h2 className="text-4xl font-bold text-gray-900 mb-6">
						Como comprar con nosotros
					</h2>
					<p className="text-lg text-gray-700 leading-relaxed mb-6">
						¡Comprar con nosotros es muy fácil, rápido y seguro! Sigue estos
						simples pasos:
					</p>

					<h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
						1. Encuentra lo que Buscas
					</h3>
					<ul className="list-disc list-outside pl-5 space-y-4 text-lg text-gray-700 leading-relaxed">
						<li>
							<strong>Usa el Buscador:</strong> Si sabes lo que quieres,
							simplemente escribe el nombre del producto en la barra de búsqueda
							principal (ubicada en la parte superior de la página).
						</li>
						<li>
							<strong>Explora las Categorías:</strong> Navega por nuestras
							diferentes categorías en el menú principal. Utiliza los filtros
							(como precio, marca, etc.) para afinar tu búsqueda hasta encontrar
							el producto perfecto.
						</li>
					</ul>

					<h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
						2. Agrega Productos a tu Carrito
					</h3>
					<ul className="list-disc list-outside pl-5 space-y-4 text-lg text-gray-700 leading-relaxed">
						<li>
							<strong>Revisa el Producto:</strong> Haz clic en un producto para
							ver sus detalles, fotos y especificaciones.
						</li>
						<li>
							<strong>Añade al Carrito:</strong> Si te decides, selecciona la
							cantidad que deseas y haz clic en el botón "Agregar al Carrito".
						</li>
						<li>
							<strong>Sigue Comprando:</strong> Puedes seguir navegando y
							añadiendo más productos, o ir a tu carrito (el ícono en la esquina
							superior derecha) para finalizar la compra.
						</li>
					</ul>

					<h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
						3. Finaliza tu Compra (Checkout)
					</h3>
					<ul className="list-disc list-outside pl-5 space-y-4 text-lg text-gray-700 leading-relaxed">
						<li>
							<strong>Revisa tu Carrito:</strong> Asegúrate de que todos los
							productos y cantidades en tu carrito sean correctos.
						</li>
						<li>
							<strong>Ingresa</strong> tus <strong>Datos:</strong> Completa la
							información de envío (la dirección donde quieres recibir tu
							pedido) y tus datos de contacto.
						</li>
						<li>
							<strong>Paga con Seguridad:</strong> Elige tu método de pago
							preferido. Todas nuestras transacciones son 100% seguras y están
							encriptadas para proteger tu información.
						</li>
					</ul>

					<h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
						4. Recibe y Disfruta tu Pedido
					</h3>
					<ul className="list-disc list-outside pl-5 space-y-4 text-lg text-gray-700 leading-relaxed">
						<li>
							<strong>Confirmación:</strong> Una vez completado el pago,
							recibirás un correo electrónico de confirmación con el resumen de
							tu compra y los detalles del envío.
						</li>
						<li>
							<strong>Seguimiento:</strong> Te mantendremos informado sobre el
							estado de tu pedido.
						</li>
						<li>
							<strong>¡Disfruta!:</strong> Recibe tu producto en la puerta de tu
							casa.
						</li>
					</ul>
				</section>

				<section ref={terminosRef} id="terminos" className="py-20">
					<h2 className="text-4xl font-bold text-gray-900 mb-6">Privacidad</h2>
					<p className="text-lg text-gray-700 leading-relaxed">
						Tienes derecho a acceder, corregir o solicitar la eliminación de tu
						información personal en cualquier momento. Puedes hacerlo desde la
						configuración de tu perfil o contactando a nuestro equipo de
						soporte.
					</p>
				</section>
			</main>
		</div>
	);
}
