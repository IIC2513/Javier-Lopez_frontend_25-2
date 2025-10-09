import React, { useRef } from "react";
import SpotlightCard from "./../components/TeamCard";

function AboutUs() {
  const cardsRef = useRef(null);

  const handleScroll = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  let members = [
    {
      nombre: "Vicente Cuitiño",
      image: "https://avatars.githubusercontent.com/u/162657721?v=4",
      title: "Frontend Leader",
      description: "Mi compa le aplica al frontend",
      github: "https://github.com/mangofrapuccino",
    },
    {
      nombre: "Esteban Ortega",
      image: "http://avatars.githubusercontent.com/u/130420779?v=4",
      title: "Project Leader",
      description: "Mi compa le aplica al react",
      github: "https://github.com/estebankiito",
    },
    {
      nombre: "Miguel Ulloa",
      image: "https://avatars.githubusercontent.com/u/130802805?v=4",
      title: "Backend Leader",
      description: "Mi compa le aplica al backend",
      github: "https://github.com/miguelulloawood",
    },
  ];
  return (
    <div className="bg-[#2F5B61] min-h-screen flex flex-col items-center justify-center p-6">
      {/* Sección superior */}
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

      {/* Sección inferior con cards */}
      <div
        ref={cardsRef}
        className="min-h-screen flex flex-col items-center justify-center"
      >
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {members.map((member) => (
            <SpotlightCard
              key={member.nombre}
              spotlightColor="#f6efe2"
              member={member}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
