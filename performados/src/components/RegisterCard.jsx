import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest, loginRequest } from "../api";
const RegisterCard = ({
  users,
  setUsers,
  setCurrentUser,
  currentID,
  setCurrentID,
  setToken,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password, name);
  };
  const onRegister = async (email, password, name) => {
    setErrors(false);
    if (users.some((u) => u.email === email)) {
      setErrors(true);
      return;
    }
    try {
      await registerRequest(name, email, password);
      const { data } = await loginRequest(email, password);
      const { token, user } = data;
      localStorage.setItem("token", token);
      if (setToken) setToken(token);
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      setUsers([...users, { id: user.id, name, email }]);
      navigate("/");
    } catch (err) {
      console.error("Register/Login error", err);
      setErrors(true);
    }
  };

  return (
    <div className="mt-[6rem] bg-[#F6EFE2] flex items-center justify-center flex-col p-6 rounded-2xl shadow-md">
      <h1
        className="font-sora px-4 text-[#2F5B61] my-2 text-3xl"
        style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
      >
        Registrarse{" "}
      </h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          className="mb-4 p-2 rounded-lg my-2 border border-[#2F5B61]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          className="mb-4 p-2 rounded-lg my-2 border border-[#2F5B61]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="mb-4 p-2 rounded-lg my-2 border border-[#2F5B61]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#2b555b] text-white p-2 rounded-lg my-2"
        >
          Registrarse
        </button>
      </form>
      {errors && (
        <>
          <p
            className="text-red-500 font-sora px-4 my-2"
            style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
          >
            Este correo ya está en uso.
          </p>
        </>
      )}
    </div>
  );
};
export default RegisterCard;
