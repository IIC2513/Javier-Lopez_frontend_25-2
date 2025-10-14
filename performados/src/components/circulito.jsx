import React from 'react';

const CircleRevealStyle = () => (
    <style jsx="true" global="true">
        {`
            /* Define el efecto de expansión circular */
            @keyframes circleExpand {
              from {
                /* Empieza en el centro como un punto */
                clip-path: circle(0% at 50% 50%);
              }
              to {
                /* Se expande para cubrir toda el área */
                clip-path: circle(150% at 50% 50%);
              }
            }

            /* Clase que se aplicará a la capa de color */
            .animate-circle-reveal {
              /* Inicialmente no visible, listo para animar */
              clip-path: circle(0% at 50% 50%); 
              
              /* Aplicación de la animación: 0.5s rápido y suave */
              animation: circleExpand 1s ease-in-out forwards; 
            }
        `}
    </style>
);

export default CircleRevealStyle;