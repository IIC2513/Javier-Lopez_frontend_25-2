import { useNavigate } from "react-router-dom";

const DeleteConfirmationCard = ({ onConfirm, onCancel, currentUser, setCurrentUser, users, setUsers }) => {
  const navigate = useNavigate();

  const onDelete = (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const filteredUsers = users.filter((user) => user.id !== currentUser.id);
    setUsers(filteredUsers);
    setCurrentUser(null);
    navigate("/");
  };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#2f5b61]">
            <div className="bg-[#F6EFE2] p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold mb-4 text-[#2F5B61]">¿Seguro de que quieres eliminar tu cuenta?</h2>
                <p className="mb-6 text-[#2F5B61]">Se perderán tus datos.</p>
                <div className="flex items-center justify-center flex-row">
                    <button
                        onClick={onCancel}
                        className="rounded-lg px-8 py-3 my-2 mx-3 font-sora transition-colors duration-300 border border-[#2F5B61] text-[#2F5B61] text-xl hover:bg-[#2F5B61] hover:text-white"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onDelete}
                        className="rounded-lg px-10 py-3 font-sora transition-colors duration-300 bg-[#2f5b61] text-xl text-white hover:opacity-90"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationCard;