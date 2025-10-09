// from: https://uiverse.io/Gaurav-WebDev/happy-monkey-54
import React from "react";
import styled from "styled-components";

const Card = ({ members }) => {
  const normalized = members.map((m) =>
    Array.isArray(m) && m.length === 2 ? m[1] : m
  );
  const colors = ["red", "blue", "green"];
  console.log(members);
  return (
    <StyledWrapper>
      <div className="cards">
        {normalized.map((member, idx) => {
          const name = member?.name ?? `Miembro ${idx + 1}`;
          const image = member?.image ?? null;
          const description = member?.description ?? "";
          const colorClass = colors[idx % colors.length];

          return (
            <div className={`card ${colorClass}`} key={name + idx}>
              {image && <img src={image} alt={name} className="avatar" />}
              <p className="tip">{name}</p>
              <p className="second-text">{description}</p>
            </div>
          );
        })}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cards {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    gap: 2rem;
  }

  .cards .red {
    background-color: #fca41d;
  }

  .cards .blue {
    background-color: #707a45ff;
  }

  .cards .green {
    background-color: #fd538b;
  }

  .cards .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    /* medidas fluidas */
    width: clamp(12rem, 25vw, 18rem);
    height: clamp(8rem, 20vh, 10rem);

    border-radius: 1rem;
    color: white;
    cursor: pointer;

    transition: transform 0.4s ease, box-shadow 0.4s ease,
      background-color 0.4s ease;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  }

  .cards .card p.tip {
    font-size: 1rem;
    font-weight: 900;
    color: #354024;
  }

  .cards .card p.second-text {
    font-size: 0.9rem;
    opacity: 0.9;
    color: #354024;
  }

  .cards .card:hover {
    transform: scale(1.08);
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.4);
    background-color: rgba(255, 255, 255, 0.1);
    color: #333;
  }

  .cards:hover > .card:not(:hover) {
    filter: blur(6px);
    transform: scale(0.95);
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  }
`;

export default Card;
