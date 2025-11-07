import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api";

const LoginCard = ({ users, setCurrentUser, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const onLogin = async (email, password) => {
    setErrors(false);
    try {
      const { data } = await loginRequest(email, password);
      const { token, user } = data;

      localStorage.setItem("token", token);
      if (setToken) setToken(token);
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setErrors(true);
    }
  };

  return (
    <div className="mt-[6rem] bg-[#F6EFE2] flex items-center justify-center flex-col p-6 sm:p-8 rounded-2xl shadow-md w-11/12 max-w-md">
      <h1
        className="font-sora px-1 my-2 text-[#2F5B61] text-3xl"
        style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
      >
        Iniciar Sesión{" "}
      </h1>

      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Correo Electrónico"
          className="w-full mb-4 p-3 rounded-lg my-2 border border-[#2F5B61]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-3 rounded-lg my-2 border border-[#2F5B61]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-[#2b555b] text-white p-3 rounded-lg my-2"
        >
          Iniciar Sesión
        </button>
      </form>
      {errors && (
        <>
          <p
            className="text-red-500 font-sora px-4 my-2"
            style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
          >
            Correo o contraseña incorrectos.
          </p>
        </>
      )}
    </div>
  );
};

export default LoginCard;
