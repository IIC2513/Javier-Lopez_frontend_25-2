import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Product from "./Product";

const URL_API = import.meta.env.VITE_API_URL;

const getStatusColor = (status) => {
	switch (status?.toLowerCase()) {
		case "paid":
		case "pagado":
			return "bg-[#fca41d]";
		case "shipped":
		case "enviado":
			return "bg-[#2f5b61]";
		case "delivered":
		case "entregado":
			return "bg-[#839243]";
		case "cancelled":
		case "cancelado":
			return "bg-red-500";
		default:
			return "bg-gray-400";
	}
};

const translateStatus = (status) => {
	const map = {
		Paid: "Pagado",
		Shipped: "Enviado",
		Delivered: "Entregado",
		Cancelled: "Cancelado",
	};
	return map[status] || status || "Desconocido";
};

const MyPurchases = ({
	currentUser,
	cartList,
	setCartList,
	setterCartOpen,
}) => {
	const [purchasedProducts, setPurchasedProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isProductOpen, setIsProductOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchPurchases = async () => {
			if (!currentUser) return;
			const token = localStorage.getItem("token");
			if (!token) {
				setError("No hay sesión activa.");
				setLoading(false);
				return;
			}

			try {
				const response = await axios.get(
					`${URL_API}/sales/user/${currentUser.id}`,
					{ headers: { Authorization: `Bearer ${token}` } }
				);

				const products = response.data.flatMap((sale) => {
					const saleStatus = sale.deliveryStatus || "Desconocido";

					const items = sale.orderItems || sale.items || [];
					return items.map((item) => {
						const prodInfo = item.Product || item.product || item;
						return {
							...item,
							uniqueKey: item.id || Math.random(),
							image: prodInfo.image || "https://via.placeholder.com/150",
							name: prodInfo.name || "Producto desconocido",
							price: prodInfo.price || 0,
							id: prodInfo.id || item.productId,
							description:
								prodInfo.description || "Sin descripción disponible.",
							color: prodInfo.color || "default",
							condition: prodInfo.condition || "used",
							stock: prodInfo.stock || 0,
							OwnerId: prodInfo.ownerId || 0,

							deliveryStatus: saleStatus,
						};
					});
				});
				setPurchasedProducts(products);
				setLoading(false);
			} catch (err) {
				console.error("Error buscando compras:", err);
				setLoading(false);
			}
		};
		fetchPurchases();
	}, [currentUser]);

	const handleCardClick = (productItem) => {
		setSelectedProduct(productItem);
		setIsProductOpen(true);
	};

	if (!currentUser) {
		return (
			<div className="min-h-screen bg-[#ece2cc] flex items-center justify-center">
				<h2 className="text-2xl text-[#2e5b61] font-bold">
					Debes iniciar sesión.
				</h2>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#ece2cc]">
			<div className="flex flex-col">
				<div className="bg-[#2e5b61] text-[#efe6d2] shadow-md pt-25 pb-10 sm:py-20 md:pb-10 sm:pt-30 md:pt-30 lg:pt-28 lg:pb-10 px-4">
					<h2
						className="text-sm font-bold text-center mt-10 mb-1"
						style={{ fontFamily: "sora, sans-serif" }}
					>
						tus tesoros adquiridos
					</h2>
					<h2
						className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center"
						style={{ fontFamily: "Anton, sans-serif" }}
					>
						MIS COMPRAS
					</h2>
				</div>

				<div className="container mx-auto px-4 py-8">
					{loading ? (
						<div className="text-center text-[#2e5b61] text-xl font-bold animate-pulse mt-10">
							Cargando...
						</div>
					) : error ? (
						<div className="text-center text-red-500 text-xl font-bold mt-10">
							{error}
						</div>
					) : purchasedProducts.length === 0 ? (
						<div className="text-center py-20">
							<h3 className="text-2xl text-[#2e5b61] font-bold mb-4">
								Aún no has realizado compras.
							</h3>
							<button
								onClick={() => navigate("/products")}
								className="bg-[#2e5b61] text-white px-6 py-3 rounded-lg hover:bg-[#1e3d41] transition-colors cursor-pointer"
							>
								Ir a la Tienda
							</button>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{purchasedProducts.map((item, index) => (
								<div
									key={`${item.uniqueKey}-${index}`}
									onClick={() => handleCardClick(item)}
									className="group bg-[#f6efe2] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-row h-40 border border-[#d3c9b6]"
								>
									<div className="w-1/3 h-full bg-white flex items-center justify-center overflow-hidden p-2">
										<img
											src={item.image}
											alt={item.name}
											className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
										/>
									</div>

									<div className="w-2/3 p-4 flex flex-col justify-center relative">
										<span
											className={`absolute top-2 right-2 text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-wider shadow-sm ${getStatusColor(
												item.deliveryStatus
											)}`}
										>
											{translateStatus(item.deliveryStatus)}
										</span>

										<h3
											className="text-xl font-bold text-[#2e5b61] leading-tight mb-1 group-hover:text-[#fca41d] transition-colors line-clamp-2 pr-16" // pr-16 para no chocar con el badge
											style={{ fontFamily: "Anton, sans-serif" }}
										>
											{item.name}
										</h3>

										<p
											className="text-sm text-[#26484d] font-bold"
											style={{ fontFamily: "sora, sans-serif" }}
										>
											${item.price}
										</p>

										{item.quantity && (
											<p className="text-xs text-gray-500 mt-1">
												Cantidad: {item.quantity}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{isProductOpen && selectedProduct && (
				<Product
					{...selectedProduct}
					setIsProductOpen={setIsProductOpen}
					setCartList={setCartList}
					cartList={cartList}
					setterCartOpen={setterCartOpen}
					openEditModal={() => {}}
				/>
			)}
		</div>
	);
};

export default MyPurchases;
