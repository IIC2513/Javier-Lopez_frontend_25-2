import { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterCard = ({ users, setUsers, setCurrentUser, currentID, setCurrentID }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password, name);
    };
    const onRegister = (email, password, name) => {
        const emailAlreadyExists = users.some((u) => u.email === email);
        if (emailAlreadyExists) {
                setErrors(true);
                return;
        }

        setErrors(false);
        const newUser = { email, password, name, id: currentID + 1 };
        setCurrentID(currentID + 1);
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
        setEmail('');
        setPassword('');
        setName('');
        navigate('/');
    };


    return (
        <div className="mt-[6rem] bg-[#F6EFE2] flex items-center justify-center flex-col p-6 rounded-2xl shadow-md">
            <h1 className="font-sora px-4 text-[#2F5B61] my-2"
            style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}> 
            Registrarse </h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input name="name" 
                       placeholder="Nombre" 
                       className="mb-4 p-2 rounded my-2" 
                       value={name} onChange={(e) => 
                       setName(e.target.value)} />
                <input type="email" name="email" 
                       placeholder="Correo Electrónico" 
                       className="mb-4 p-2 rounded my-2" 
                       value={email} onChange={(e) => 
                       setEmail(e.target.value)} />
                <input type="password" 
                             name="password" 
                             placeholder="Contraseña" 
                             className="mb-4 p-2 rounded  my-2" 
                             value={password} 
                             onChange={(e) => 
                             setPassword(e.target.value)} />
                <button type="submit" className="bg-[#2b555b] text-white p-2 rounded my-2">Registrarse</button>
            </form>
            {errors && <><p className="text-red-500 font-sora px-4 my-2"
            style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
            >Este correo ya está en uso.</p></>}

        </div>
    );
}
export default RegisterCard;