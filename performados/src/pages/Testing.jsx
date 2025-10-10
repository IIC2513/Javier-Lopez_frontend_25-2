import AnimatedContent from "../components/animacion";
import matcha from "../assets/matcha.png";

export default function Testing() {
	return (
		<AnimatedContent
			distance={350}
			direction="vertical"
			reverse={false}
			duration={1.2}
			ease="power3.out"
			initialOpacity={0}
			animateOpacity
			scale={1.0}
			threshold={0.1}
			delay={0}
		>
			<div>
				<img src={matcha} alt="Matcha Latte" />
			</div>
		</AnimatedContent>
	);
}
