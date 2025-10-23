import Carousel from "../components/Carousel";

export default function LandingPage() {
	return (
		<div>
			{/* MODIFICADO: Se corrigieron las props. 'loop' no existe y 'pauseOn' es 'pauseOnHover' */}
			<Carousel autoplay autoplayDelay={5000} pauseOnHover />
		</div>
	);
}
