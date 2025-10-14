import { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterCard = ({ users, setUsers, setCurrentUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password);
    };
    const onRegister = (email, password) => {
        const emailAlreadyExists = users.some((u) => u.email === email);
        if (emailAlreadyExists) {
                setErrors(true);
                return;
        }

        setErrors(false);
        const newUser = { email, password };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
        setEmail('');
        setPassword('');
        navigate('/');
    };


    return (
        <div className="bg-white flex items-center justify-center flex-col p-6 rounded-2xl shadow-md">
            <h1 className="font-sora px-4"
            style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}> 
            Registrarse </h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input type="email" name="email" 
                       placeholder="Correo Electrónico" 
                       className="mb-4 p-2 rounded" 
                       value={email} onChange={(e) => 
                       setEmail(e.target.value)} />
                <input type="password" 
                             name="password" 
                             placeholder="Contraseña" 
                             className="mb-4 p-2 rounded" 
                             value={password} 
                             onChange={(e) => 
                             setPassword(e.target.value)} />
                <button type="submit" className="bg-[#2b555b] text-white p-2 rounded">Registrarse</button>
            </form>
            {errors && <><p className="text-red-500 font-sora px-4"
            style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
            >Este correo ya está en uso.</p></>}

        </div>
    );
}
export default RegisterCard;