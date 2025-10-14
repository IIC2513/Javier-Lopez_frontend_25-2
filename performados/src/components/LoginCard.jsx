import { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginCard = ({ users, setCurrentUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [errors, setErrors] = useState(false);    
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    const onLogin = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      navigate('/')
    } else {
        setErrors(true)
        navigate('/login')
      
    }
  }

    return (
        <div className="bg-white flex items-center justify-center flex-col p-6 rounded-2xl shadow-md">
            <h1 className="font-sora px-4"
            style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}> 
            Iniciar Sesión </h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input name="email" placeholder="Correo Electrónico" className="mb-4 p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />  
                <input type="password" name="password" placeholder="Contraseña" className="mb-4 p-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="bg-[#2b555b] text-white p-2 rounded">Iniciar Sesión</button>
            </form>
            {errors && <><p className="text-red-500 font-sora px-4"
            style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
            >Correo o contraseña incorrectos.</p></>}
        </div>
    );
}

export default LoginCard;