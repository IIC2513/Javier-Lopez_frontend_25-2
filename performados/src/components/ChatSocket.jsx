import { useState, useEffect, useRef } from "react";
import api from "../api";

const Chat = ({
  users = [],
  currentUser,
  messages = [],
  setMessages,
  token,
}) => {
  const [input, setInput] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [currentOtherUser, setCurrentOtherUser] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const ws = useRef(null);

  useEffect(() => {
    if (!currentUser) return;
    if (ws.current) return;

    const wsUrl = import.meta.env.VITE_API_URL.replace(/^http/, "ws");
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      ws.current.send(
        JSON.stringify({
          type: "AUTH",
          userId: currentUser.id,
        })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "NEW_MESSAGE") {
        setMessages((prev) => [
          ...prev,
          {
            id: data.message.id,
            content: data.message.content,
            senderId: data.senderId,
          },
        ]);
      }
    };

    ws.current.onclose = () => console.log("WS cerrado");
    ws.current.onerror = (e) => console.log("WS error", e);

    return () => {};
  }, [currentUser]);

  const handleSend = async () => {
    if (!currentUser || !currentOtherUser) return;
    const text = input.trim();
    if (!text) return;

    // Ensure we have a chat id
    let chatId = currentChatId;
    if (!chatId) {
      // create chat and set id
      try {
        const newChat = await createChat(currentUser.id, currentOtherUser.id);
        if (newChat && newChat.id) {
          chatId = newChat.id;
          setCurrentChatId(chatId);
        }
      } catch (err) {
        console.error("Error creating chat before sending:", err);
      }
    }

    const payload = {
      chatId: chatId || null,
      senderId: currentUser.id,
      content: text,
    };

    setMessages((prev) => [...prev, { ...payload, id: Date.now() }]);
    setInput("");

    try {
      await api.post(
        "/messages",
        {
          chatId: chatId,
          senderId: currentUser.id,
          content: text,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error sending message to API:", error);
    }
  };
  const getchats = async (currentID) => {
    try {
      const response = await api.get(`/chats/${currentID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching chats:", error);
      return [];
    }
  };
  const createChat = async (currentUserID, otherUserID) => {
    try {
      const response = await api.post(
        `/chats`,
        {
          clientId: currentUserID,
          SellerId: otherUserID,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating chat:", error);
      return null;
    }
  };

  const getVendors = async () => {
    try {
      const response = await api.get(`/users`);
      const chats = await getchats(currentUser.id);
      const clients = chats.map((chat) => chat.buyerId);

      const vs = response.data.filter(
        (user) => user.role === "seller" || user.role === "admin"
      );
      let set = new Set();
      for (let c of clients) {
        set.add(c);
      }
      for (let v of vs) {
        set.add(v.id);
      }
      const uniqueVendorIds = Array.from(set);
      const uniqueVendors = response.data.filter((user) =>
        uniqueVendorIds.includes(user.id)
      );
      setVendors(uniqueVendors);
      return uniqueVendors;
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setVendors([]);
      return [];
    }
  };
  const getChatMessages = async (chatId) => {
    try {
      const response = await api.get(`/messages/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  // load vendors when component mounts or when token changes
  useEffect(() => {
    getVendors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!openChat && (
        <button
          className="bg-[#2f5b61] text-[#f6efe2] px-4 py-2 rounded"
          onClick={() => setOpenChat(true)}
        >
          Abrir Chat
        </button>
      )}

      {openChat && (
        <div className="bg-[#f6efe2] p-4 border border-[#2f5b61] rounded shadow-lg w-80 h-96 flex flex-col">
          {!currentOtherUser ? (
            <div className="mb-4">
              <div className="flex items-center justify-between gap-2 flex-row">
                <h2 className="text-lg font-bold mb-2 text-[#2f5b61]">
                  Selecciona un usuario
                </h2>
                <button
                  className="text-sm text-[#2f5b61] hover:underline"
                  onClick={() => setOpenChat(false)}
                >
                  Cerrar
                </button>
              </div>
              <ul>
                {vendors
                  .filter((user) => currentUser && user.id !== currentUser.id)
                  .map((user) => (
                    <li
                      key={user.id}
                      onClick={() => {
                        (async () => {
                          try {
                            const chats = await getchats(currentUser.id);
                            let chat = chats.find(
                              (c) =>
                                (c.buyerId === currentUser.id &&
                                  c.sellerId === user.id) ||
                                (c.buyerId === user.id &&
                                  c.sellerId === currentUser.id)
                            );
                            if (!chat) {
                              chat = await createChat(currentUser.id, user.id);
                            }
                            if (chat && chat.id) {
                              const msgs = await getChatMessages(chat.id);
                              setMessages(msgs);
                              setCurrentOtherUser(user);
                              setCurrentChatId(chat.id);
                            }
                          } catch (err) {
                            console.error("Error selecting chat:", err);
                          }
                        })();
                      }}
                      className={
                        "cursor-pointer border border-[#2f5b61] p-2 rounded text-[#2f5b61]"
                      }
                    >
                      <div className="flex items-center gap-2 flex-row">
                        <img
                          src={
                            user.image ||
                            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
                          }
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg";
                          }}
                          alt="Profile"
                          className="w-6 h-6 rounded-full"
                        />
                        {user.name}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <>
              <div className="flex justify-between mb-2">
                <img
                  src={
                    currentOtherUser.image ||
                    "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
                  }
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg";
                  }}
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
                <h2 className="font-bold text-[#2f5b61]">
                  {currentOtherUser.name}
                </h2>
                <button
                  className="text-sm text-[#2f5b61] hover:underline"
                  onClick={() => setCurrentOtherUser(null)}
                >
                  Seleccionar otro chat
                </button>
                <button
                  className="text-sm text-[#2f5b61] hover:underline"
                  onClick={() => setOpenChat(false)}
                >
                  Cerrar
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2 my-2 rounded max-w-[80%] ${
                      msg.senderId === currentUser.id
                        ? "bg-[#2f5b61] text-[#f6efe2] self-end ml-auto"
                        : "bg-[#f6efe2] text-[#2f5b61] border border-[#2f5b61]"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  className="border border-[#2f5b61] text-[#2f5b61] p-2 rounded w-full"
                  placeholder={`Enviar mensaje a ${currentOtherUser.name}`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  className="bg-[#2f5b61] text-[#f6efe2] px-4 py-2 rounded mt-2 w-full"
                  onClick={handleSend}
                >
                  Enviar
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;
