import React from "react";
import TeamCards from "../components/TeamCards";

const AboutUs = () => {
  //const members = ["Vicente Cuitiño", "Esteban Ortega", "Miguel Ulloa"];
  const members = [
    {
      name: "Vicente Cuitiño",
      image: "https://avatars.githubusercontent.com/u/162657721?v=4",
      description: "Descripcion del Vicho",
    },
    {
      name: "Esteban Ortega",
      image:
        "https://avatars.githubusercontent.com/u/130420779?s=400&u=7a7d20637905d7ac54687cd12a35c2ad32cbdb54&v=4",
      description: "Descripcion del Esteban",
    },
    {
      name: "Miguel Ulloa",
      image:
        "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/05/pokemon-go-1945845.jpg?tf=1200x",
      description: "Descripcion del Miguel",
    },
  ];

  return (
    <>
      <div className="pagina-about-us min-h-screen p-10 bg-[#f6efe2] ">
        <section className="">
          <h2 className="text-5xl font-semibold text-center margin-top-50 mb-0">
            Nuestro equipo
          </h2>
          <div className="flex justify-center max-h-200 items-center mt-10 ">
            <TeamCards members={Object.entries(members)} />
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
