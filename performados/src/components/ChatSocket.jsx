import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import api from "../api";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:3000";
const SOCKET_URL = URL_API.replace("/api", "");
const socket = io.connect(SOCKET_URL);

const Chat = ({ currentUser, token }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [view, setView] = useState("list");

	const [vendors, setVendors] = useState([]);
	const [currentChatUser, setCurrentChatUser] = useState(null);
	const [currentChatId, setCurrentChatId] = useState(null);
	const [messages, setMessages] = useState([]);
	const [inputText, setInputText] = useState("");

	const scrollRef = useRef(null);
	const [hasNotification, setHasNotification] = useState(false);

	useEffect(() => {
		if (currentUser && token) {
			getVendors();
		}
	}, [currentUser, token]);

	useEffect(() => {
		const handleRefresh = () => {
			console.log("Actualizando lista de usuarios...");
			getVendors();
		};

		socket.on("refresh_user_list", handleRefresh);

		return () => {
			socket.off("refresh_user_list", handleRefresh);
		};
	}, [currentUser, token]);

	const getVendors = async () => {
		try {
			const [usersRes, chatsRes] = await Promise.all([
				api.get(`/users`),
				api.get(`/chats/${currentUser.id}`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
			]);

			const allUsers = usersRes.data;
			const myChats = chatsRes.data || [];

			myChats.forEach((chat) => {
				socket.emit("join_room", chat.id);
			});

			const chatPartnerIds = new Set();
			myChats.forEach((chat) => {
				if (chat.buyerId === currentUser.id) chatPartnerIds.add(chat.sellerId);
				if (chat.sellerId === currentUser.id) chatPartnerIds.add(chat.buyerId);
			});

			const availableUsers = allUsers.filter(
				(user) =>
					user.id !== currentUser.id &&
					(user.role === "seller" ||
						user.role === "admin" ||
						chatPartnerIds.has(user.id))
			);

			setVendors(availableUsers);
		} catch (error) {
			console.error("Error cargando contactos:", error);
		}
	};

	const handleSelectUser = async (user) => {
		try {
			const chatsRes = await api.get(`/chats/${currentUser.id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			let chat = chatsRes.data.find(
				(c) =>
					(c.buyerId === currentUser.id && c.sellerId === user.id) ||
					(c.buyerId === user.id && c.sellerId === currentUser.id)
			);

			if (!chat) {
				const newChatRes = await api.post(
					`/chats`,
					{
						clientId: currentUser.id,
						SellerId: user.id,
					},
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				chat = newChatRes.data;
			}

			if (chat && chat.id) {
				setCurrentChatId(chat.id);
				setCurrentChatUser(user);
				const msgsRes = await api.get(`/messages/${chat.id}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setMessages(msgsRes.data);

				socket.emit("join_room", chat.id);

				setView("chat");
			}
		} catch (error) {
			console.error("Error al entrar al chat:", error);
		}
	};

	useEffect(() => {
		const handleReceiveMessage = (newMessage) => {
			console.log("Mensaje recibido. Chat abierto?:", isOpen);

			if (currentChatId && newMessage.chatId === currentChatId) {
				setMessages((prev) => [...prev, newMessage]);
			}

			getVendors();

			if (!isOpen) {
				console.log("!!! ACTIVANDO NOTIFICACIÓN !!!");
				setHasNotification(true);
			}
		};

		socket.on("receive_message", handleReceiveMessage);

		return () => {
			socket.off("receive_message", handleReceiveMessage);
		};
	}, [currentChatId, isOpen, token, currentUser]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, view]);

	const handleSendMessage = async () => {
		if (!inputText.trim() || !currentChatId) return;

		const messageData = {
			chatId: currentChatId,
			senderId: currentUser.id,
			content: inputText,
			createdAt: new Date().toISOString(),
		};
		setMessages((prev) => [...prev, messageData]);

		await socket.emit("send_message", { room: currentChatId, ...messageData });

		try {
			await api.post(
				"/messages",
				{
					chatId: currentChatId,
					senderId: currentUser.id,
					content: inputText,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
		} catch (error) {
			console.error("Error guardando mensaje:", error);
		}

		setInputText("");
	};
	if (!currentUser) return null; // No mostrar si no hay login

	return (
		<div className="fixed bottom-4 left-4 z-50 flex flex-col items-end">
			{isOpen && (
				<div className="mb-4 w-80 md:w-96 h-[500px] bg-[#f6efe2] border border-[#2e5b61] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200">
					<div className="bg-[#2e5b61] p-4 flex justify-between items-center shadow-md shrink-0">
						{view === "chat" ? (
							<div className="flex items-center gap-2">
								<button
									onClick={() => setView("list")}
									className="text-white hover:text-gray-300 mr-2"
								>
									←
								</button>
								<img
									src={
										currentChatUser?.image ||
										"https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
									}
									className="w-8 h-8 rounded-full bg-white object-cover"
								/>
								<h3 className="text-white font-bold truncate w-32">
									{currentChatUser?.name}
								</h3>
							</div>
						) : (
							<h3 className="text-white font-bold font-anton tracking-wide">
								COMUNIDAD
							</h3>
						)}

						<button
							onClick={() => setIsOpen(false)}
							className="text-white hover:text-gray-300"
						>
							✕
						</button>
					</div>

					<div className="flex-1 overflow-y-auto p-4 bg-[#f6efe2]">
						{view === "list" && (
							<ul className="space-y-2">
								{vendors.length === 0 && (
									<p className="text-center text-gray-500 mt-4">
										No hay contactos disponibles.
									</p>
								)}
								{vendors.map((user) => (
									<li
										key={user.id}
										onClick={() => handleSelectUser(user)}
										className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#d3c9b6] cursor-pointer hover:shadow-md hover:border-[#2e5b61] transition-all"
									>
										<img
											src={
												user.image ||
												"https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
											}
											className="w-10 h-10 rounded-full object-cover bg-gray-200"
											onError={(e) => {
												e.currentTarget.src =
													"https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg";
											}}
										/>
										<div>
											<p className="font-bold text-[#2e5b61]">{user.name}</p>
											<p className="text-xs text-gray-500 capitalize">
												{user.role}
											</p>
										</div>
									</li>
								))}
							</ul>
						)}

						{view === "chat" && (
							<div className="flex flex-col gap-3">
								{messages.map((msg, idx) => {
									const isMe = msg.senderId === currentUser.id;
									return (
										<div
											key={idx}
											className={`flex flex-col ${
												isMe ? "items-end" : "items-start"
											}`}
										>
											<div
												className={`px-4 py-2 rounded-xl text-sm shadow-sm max-w-[85%] break-words ${
													isMe
														? "bg-[#2e5b61] text-white rounded-br-none"
														: "bg-white text-[#2e5b61] border border-[#d3c9b6] rounded-bl-none"
												}`}
											>
												{msg.content}
											</div>
										</div>
									);
								})}
								<div ref={scrollRef} />
							</div>
						)}
					</div>

					{view === "chat" && (
						<div className="p-3 bg-white border-t border-[#d3c9b6] flex gap-2 shrink-0">
							<input
								type="text"
								value={inputText}
								onChange={(e) => setInputText(e.target.value)}
								onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
								placeholder="Escribe un mensaje..."
								className="flex-1 px-4 py-2 bg-gray-100 rounded-full border border-transparent focus:border-[#2e5b61] focus:bg-white outline-none text-sm text-gray-700 transition-all"
							/>
							<button
								onClick={handleSendMessage}
								className="bg-[#2e5b61] text-white p-2 rounded-full hover:bg-[#1e3d41] transition-colors shadow-sm flex items-center justify-center w-10 h-10"
							>
								➤
							</button>
						</div>
					)}
				</div>
			)}

			{!isOpen && (
				<button
					onClick={() => {
						setIsOpen(true);
						setHasNotification(false);
					}}
					className="relative w-14 h-14 bg-[#2e5b61] hover:bg-[#1e3d41] text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
				>
					<svg
						className="w-7 h-7"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
						/>
					</svg>

					{hasNotification && (
						<span className="absolute -top-1 -right-1 flex h-5 w-5 z-50">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-white"></span>
						</span>
					)}
				</button>
			)}
		</div>
	);
};

export default Chat;
