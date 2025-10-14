import React from 'react';
const LoginCard = () => {


    return (
        <div className="bg-white flex items-center justify-center flex-col p-6 rounded-2xl shadow-md">
            <h1 className="font-sora px-4"
            style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}> 
            Iniciar Sesión </h1>
            <form className="flex flex-col">
                <input type="email" placeholder="Correo Electrónico" className="mb-4 p-2 rounded" />
                <input type="password" placeholder="Contraseña" className="mb-4 p-2 rounded" />
                <button type="submit" className="bg-[#2b555b] text-white p-2 rounded">Iniciar Sesión</button>
            </form>
        </div>
    );
} 

export default LoginCard;