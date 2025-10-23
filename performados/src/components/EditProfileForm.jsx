import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import DeleteConfirmationCard from "./DeleteConfirmationCard";

const SelfProfileForm = ({ currentUser, setCurrentUser, users, setUsers }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser = { ...currentUser };

    const update = users.map((user) =>
      user.email === originalEmail.current ? updatedUser : user
    );
    setUsers(update);
    setCurrentUser(updatedUser);
    navigate('/my-profile');
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
    <form onSubmit={handleSubmit} className="mt-[6rem] bg-[#F6EFE2] p-6 rounded-2xl shadow-md">
      <div className="flex flex-row justify-center gap-10">
      <div className="flex items-center justify-center flex-col">
      <input name="name"
            value={currentUser?.name || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
            placeholder="Nombre"
            className="mb-4 p-2 rounded my-2 border border-[#2F5B61]" />
        <input type="email" name="email"
            value={currentUser?.email || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            placeholder="Correo Electrónico"
            className="mb-4 p-2 rounded my-2 border border-[#2F5B61]" />
        <input type="password" name="password"
            value={currentUser?.password || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
            placeholder="Contraseña"
            className="mb-4 p-2 rounded my-2 border border-[#2F5B61]" />
        <textarea name="description"
            value={currentUser?.description || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, description: e.target.value })}
            placeholder="Descripción"
            className="mb-4 p-2 rounded my-2 border border-[#2F5B61]" />
   
       </div>
       <div className="flex items-center justify-center flex-col">
          <img src={currentUser?.image || "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"}
           alt="Profile" className="w-24 h-24 rounded-full" />
           <input type="text" name="image"
           value={currentUser?.image || ''}
           onChange={(e) => setCurrentUser({ ...currentUser, image: e.target.value })}
           placeholder="URL de la imagen"
           className="mb-4 p-2 rounded my-2 border border-[#2F5B61]" />
           </div>
           </div>
           <div className="flex items-center justify-center flex-row">
           <button type="submit" className="rounded-lg px-10 py-3 font-sora transition-colors duration-300 bg-[#2f5b61] text-xl text-white hover:opacity-90">Guardar Cambios</button>

           <button type="button" onClick={handleCancel} className="rounded-lg px-8 py-3 my-2 mx-3 font-sora transition-colors duration-300 border border-[#2F5B61] text-[#2F5B61] text-xl hover:bg-[#2F5B61] hover:text-white">Cancelar</button>

           <button type="button" onClick={handleDelete} className="rounded-lg px-8 py-3 my-2 mx-3 font-sora transition-colors duration-300 border border-[#2F5B61] text-[#2F5B61] text-xl hover:bg-[#2F5B61] hover:text-white">Eliminar Cuenta</button>
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
