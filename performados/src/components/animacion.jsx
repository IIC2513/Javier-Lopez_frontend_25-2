import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const AnimatedContent = ({
    children,
    distance = 100,
    direction = "vertical",
    reverse = false,
    duration = 0.8,
    ease = "power3.out",
    initialOpacity = 0,
    animateOpacity = true,
    scale = 2,
    delay = 0,
    onComplete,
    // ✨ Nuevo prop para controlar la animación flotante
    isFloating = true, 
    floatAmount = 20, // Cantidad de pixeles a moverse (ej: 20px)
    floatDuration = 3, // Duración del ciclo flotante (ej: 3 segundos)
}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        gsap.killTweensOf(el);

        const axis = direction === "horizontal" ? "x" : "y";
        const offset = reverse ? -distance : distance;

        // 1. Establece el estado inicial (para la animación de entrada)
        gsap.set(el, {
            [axis]: offset,
            scale,
            opacity: animateOpacity ? initialOpacity : 1,
            visibility: 'visible',
        });

        // 2. Anima al estado final (la animación de entrada)
        gsap.to(el, {
            [axis]: 0,
            scale: 1,
            opacity: 1,
            duration,
            ease,
            delay,
            onComplete: () => {
                // Llama al callback original si existe
                if (onComplete) onComplete(); 

                if (isFloating) {
                    gsap.to(el, {
                        y: `+=${floatAmount}`, // Mueve hacia abajo 'floatAmount' píxeles
                        duration: floatDuration,
                        ease: "sine.inOut", // Curva para un movimiento natural de subida/bajada
                        repeat: -1, // Repetir infinitamente
                        yoyo: true, // Hacer el efecto ping-pong (subir y bajar)
                    });
                }
            },
        });

        return () => {
            gsap.killTweensOf(el);
        };
    }, [
        distance,
        direction,
        reverse,
        duration,
        ease,
        initialOpacity,
        animateOpacity,
        scale,
        delay,
        onComplete,
        isFloating, 
        floatAmount,
        floatDuration,
    ]);

    return <div ref={ref}>{children}</div>;
};

export default AnimatedContent;