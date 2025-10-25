import { useState } from "react";

const Chat = ({ users = [], currentUser, messages = [], setMessages }) => {
    const [input, setInput] = useState("");
    const [openChat, setOpenChat] = useState(false);
    const [currentOtherUser, setCurrentOtherUser] = useState(null);

    const handleSend = () => {
        if (!currentUser || !currentOtherUser) return;
        if (input !== "") {
        const newMessage = {
                id: Date.now(),
                text: input,
                sender: currentUser.id,
                receiver: currentOtherUser.id,
            };
            setMessages([...messages, newMessage]);
            setInput("");
        }
        
    };

    const filteredMessages = currentOtherUser && currentUser
        ? messages.filter(
            (msg) =>
                (msg.sender === currentUser.id &&
                    msg.receiver === currentOtherUser.id) ||
                (msg.sender === currentOtherUser.id &&
                    msg.receiver === currentUser.id)
        )
        : [];

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
                                {users.length < 2 && (
                                    <li className="p-2 text-[#2f5b61]">No hay otros usuarios</li>
                                )}
                                {users
                                    .filter((user) => currentUser && user.id !== currentUser.id)
                                    .map((user) => (
                                        <li
                                            key={user.id}
                                            onClick={() => currentUser && setCurrentOtherUser(user)}
                                            className={"cursor-pointer border border-[#2f5b61] p-2 rounded text-[#2f5b61]"}
                                        >   <div className="flex items-center gap-2 flex-row">
                                            <img src={user.image || "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"}
           alt="Profile" className="w-6 h-6 rounded-full" />{user.name}
                                        </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between mb-2">
                                <img src={currentOtherUser.image || "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"}
           alt="Profile" className="w-6 h-6 rounded-full" />
                                <h2 className="font-bold text-[#2f5b61]">{currentOtherUser.name}</h2>
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
                                {filteredMessages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`p-2 my-2 rounded max-w-[80%] ${
                                            msg.sender === currentUser.id
                                                ? "bg-[#2f5b61] text-[#f6efe2] self-end ml-auto"
                                                : "bg-[#f6efe2] text-[#2f5b61] border border-[#2f5b61]"
                                        }`}
                                    >
                                        {msg.text}
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
}
export default Chat;