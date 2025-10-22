import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

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
      user.email === original.email ? original : user
    );
    setUsers(originalsUsers);
    navigate("/my-profile");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-[6rem] bg-[#F6EFE2] p-6 rounded-2xl shadow-md">
      <div className="flex flex-row">
      <div className="flex items-center justify-center flex-col">
      <input name="name"
            value={currentUser?.name || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
            placeholder="Nombre"
            className="mb-4 p-2 rounded my-2" />
        <input type="email" name="email"
            value={currentUser?.email || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            placeholder="Correo Electrónico"
            className="mb-4 p-2 rounded my-2" />
        <input type="password" name="password"
            value={currentUser?.password || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
            placeholder="Contraseña"
            className="mb-4 p-2 rounded my-2" />
        <textarea name="description"
            value={currentUser?.description || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, description: e.target.value })}
            placeholder="Descripción"
            className="mb-4 p-2 rounded my-2" />
   
       </div>
       <div className="flex items-center justify-center flex-col">
          <img src={currentUser?.image || "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"}
           alt="Profile" className="w-24 h-24 rounded-full" />
           <input type="text" name="image"
           value={currentUser?.image || ''}
           onChange={(e) => setCurrentUser({ ...currentUser, image: e.target.value })}
           placeholder="URL de la imagen"
           className="mb-4 p-2 rounded my-2" />
           </div>
           </div>
           <div className="flex items-center justify-center flex-row">
           <button type="submit" className="bg-[#2b555b] text-white p-2 rounded my-2 mx-2">Guardar Cambios</button>

           <button type="button" onClick={handleCancel} className="bg-[#2b555b] text-white p-2 rounded my-2 mx-2">Cancelar</button>
           </div>
  
    </form>
  );
};

export default SelfProfileForm;
