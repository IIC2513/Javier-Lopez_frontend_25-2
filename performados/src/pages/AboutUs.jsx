import React, { useRef } from "react";
import SpotlightCard from "./../components/TeamCard";
import Estebankiito from "../assets/Estebankiito.JPG";
import Manguito from "../assets/vicho.JPG";
import Miguel from "../assets/miguel.jpg";

function AboutUs() {
  const cardsRef = useRef(null);

  const handleScroll = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  let members = [
    {
      nombre: "Vicente Cuitiño",
      image: Manguito,
      title: "Frontend Leader",
      description: "Coordinador del cuerpo de tutores - 2026, Coordinador Open source eUC (OSUC) - 2025 (React + tailwind lo mejor del mundo mundial)",
      github: "https://github.com/mangofrapuccino",
    },
    {
      nombre: "Esteban Ortega",
      image: Estebankiito,
      title: "Project Leader",
      description: "Organizador de la AntiHackathon 2025 (Worst UI/UX) auspiciada por el CCC, Desarrollador de Tutorías/Apuntes para LICC en Github. Apasionado por el desarrollo web y diseño de UI, la musica, y el anime.",
      github: "https://github.com/estebankiito",
    },
    {
      nombre: "Miguel Ulloa",
      image: Miguel,
      title: "Backend Leader",
      description: "Estudiante de tercer año de LICC. Me especializo en el desarrollo de APIs, servidores y sistemas de autenticación.",
      github: "https://github.com/miguelulloawood",
    },
  ];
  return (
    <div className="bg-[#2F5B61] min-h-screen flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center justify-center text-center min-h-screen">
        <h1
          className="text-[50px] tracking-tight"
          style={{
            fontFamily: "MidnightGelactic, sans-serif",
            color: "#f6efe2",
          }}
        >
          Sobre Nosotros
        </h1>
        <p
          className="text-xl text-[#f6efe2] max-w-3xl text-center font-sora mb-6"
          style={{ fontFamily: "sora, sans-serif" }}
        >
          Somos un equipo formado por tres estudiantes universitarios
          apasionados por la tecnología y el desarrollo web, comprometidos a
          traer nuevas experiencias a los usuarios a través de nuestras
          aplicaciones.
        </p>
        <button
          type="button"
          onClick={handleScroll}
          className="rounded-full px-10 py-3 font-sora transition-colors duration-300 bg-[#77aab0] text-xl text-white hover:opacity-90"
          style={{ fontFamily: "sora, sans-serif", fontWeight: "bolder" }}
        >
          ⬇
        </button>
      </div>
      <div
        ref={cardsRef}
        className="min-h-screen flex flex-col items-center justify-center"
      >
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {members.map((member) => (
            <SpotlightCard
              key={member.nombre}
              spotlightColor="rgba(119, 170, 176, 0.65)"
              member={member}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
