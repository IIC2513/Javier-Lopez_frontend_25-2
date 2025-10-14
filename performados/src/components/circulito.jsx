import React from 'react';

const CircleRevealStyle = () => (
    <style jsx="true" global="true">
        {`
            @keyframes circleExpand {
              from {
                clip-path: circle(0% at 50% 50%);
              }
              to {
                clip-path: circle(150% at 50% 50%);
              }
            }

            .animate-circle-reveal {
              clip-path: circle(0% at 50% 50%); 
              
              animation: circleExpand 1s ease-in-out forwards; 
            }
        `}
    </style>
);

export default CircleRevealStyle;