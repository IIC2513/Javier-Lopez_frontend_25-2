import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import DeleteConfirmationCard from "./DeleteConfirmationCard";
import api from "../api";

const SelfProfileForm = ({
  currentUser,
  setCurrentUser,
  users,
  setUsers,
  token,
}) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(false);

  const originalUser = useRef(currentUser ? { ...currentUser } : null);
  const originalEmail = useRef(currentUser?.email);

  useEffect(() => {
    if (originalUser.current === null && currentUser) {
      originalUser.current = { ...currentUser };
      originalEmail.current = currentUser.email;
    }
  }, []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(`/users/${currentUser.id}`, currentUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const updatedUser = res.data.user;
        setCurrentUser(updatedUser);
        const updatedUsers = users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        setUsers(updatedUsers);
        currentUser = updatedUser;
        navigate("/my-profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors(true);
      return;
    }
    if (!currentUser) return;
    navigate("/my-profile");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    const original = originalUser.current;
    if (!original) {
      navigate("/my-profile");
      return;
    }
    setCurrentUser(original);
    const originalsUsers = users.map((user) =>
      user.id === original.id ? original : user
    );
    setUsers(originalsUsers);
    navigate("/my-profile");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-[6rem] bg-[#F6EFE2] rounded-lg shadow-xl max-w-3xl w-full overflow-hidden relative"
        style={{ fontFamily: "sora, sans-serif" }}
      >
        <div className="bg-[#2F5B61] h-40 p-6">
          <h2 className="text-3xl font-bold text-[#F6EFE2] text-center pt-4">
            Editar Perfil
          </h2>
        </div>
        <img
          src={
            currentUser?.image ||
            "https://www.svgrepo.com/show/335455/profile-default.svg"
          }
          alt="Profile"
          className="w-36 h-36 rounded-full absolute left-1/2 -translate-x-1/2 top-20 border-4 border-[#F6EFE2] shadow-md"
        />
        <div className="p-8 pt-24 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="text-lg font-bold text-[#2F5B61] block mb-2"
              >
                Nombre
              </label>
              <input
                id="name"
                name="name"
                value={currentUser?.name || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, name: e.target.value })
                }
                placeholder="Tu nombre"
                className="w-full p-3 rounded-lg border border-[#d3c9b6] text-gray-700 bg-[#efe6d2] focus:outline-none focus:ring-2 focus:ring-[#2F5B61]"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-lg font-bold text-[#2F5B61] block mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={currentUser?.email || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
                placeholder="tu@email.com"
                className="w-full p-3 rounded-lg border border-[#d3c9b6] text-gray-700 bg-[#efe6d2] focus:outline-none focus:ring-2 focus:ring-[#2F5B61]"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="image"
              className="text-lg font-bold text-[#2F5B61] block mb-2"
            >
              URL de Imagen de Perfil
            </label>
            <input
              id="image"
              type="text"
              name="image"
              value={currentUser?.image || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, image: e.target.value })
              }
              placeholder="https://..."
              className="w-full p-3 rounded-lg border border-[#d3c9b6] text-gray-700 bg-[#efe6d2] focus:outline-none focus:ring-2 focus:ring-[#2F5B61]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-lg font-bold text-[#2F5B61] block mb-2"
            >
              Nueva Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={currentUser?.password || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, password: e.target.value })
              }
              placeholder="Tu contraseña"
              className="w-full p-3 rounded-lg border border-[#d3c9b6] text-gray-700 bg-[#efe6d2] focus:outline-none focus:ring-2 focus:ring-[#2F5B61]"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-lg font-bold text-[#2F5B61] block mb-2"
            >
              Tu Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={currentUser?.description || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, description: e.target.value })
              }
              placeholder="Escribe algo sobre ti..."
              className="w-full h-32 p-3 rounded-lg border border-[#d3c9b6] text-gray-700 bg-[#efe6d2] focus:outline-none focus:ring-2 focus:ring-[#2F5B61] resize-none"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-[#efe6d2] border-t border-[#d3c9b6]">
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg px-6 py-3 my-2 font-sora transition-colors duration-300 border border-red-500 text-red-500 text-lg hover:bg-red-500 hover:text-white w-full md:w-auto"
          >
            Eliminar Cuenta
          </button>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg px-8 py-3 my-2 font-sora transition-colors duration-300 border border-[#2F5B61] text-[#2F5B61] text-lg hover:bg-[#2F5B61] hover:text-white w-full sm:w-auto"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg px-10 py-3 my-2 font-sora transition-colors duration-300 bg-[#2f5b61] text-lg text-white hover:opacity-90 w-full sm:w-auto"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </form>
      {showDeleteModal && (
        <DeleteConfirmationCard
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          users={users}
          setUsers={setUsers}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default SelfProfileForm;
