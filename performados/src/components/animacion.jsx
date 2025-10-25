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
    isFloating = true, 
    floatAmount = 20,
    floatDuration = 3, 
}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        gsap.killTweensOf(el);

        const axis = direction === "horizontal" ? "x" : "y";
        const offset = reverse ? -distance : distance;

        gsap.set(el, {
            [axis]: offset,
            scale,
            opacity: animateOpacity ? initialOpacity : 1,
            visibility: 'visible',
        });

        gsap.to(el, {
            [axis]: 0,
            scale: 1,
            opacity: 1,
            duration,
            ease,
            delay,
            onComplete: () => {
                if (onComplete) onComplete(); 

                if (isFloating) {
                    gsap.to(el, {
                        y: `+=${floatAmount}`, 
                        duration: floatDuration,
                        ease: "sine.inOut", 
                        repeat: -1, 
                        yoyo: true, 
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