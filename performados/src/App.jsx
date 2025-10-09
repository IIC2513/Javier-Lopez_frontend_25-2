import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/Landing";
import Navbar from "./components/Navbar";
import logo from "./assets/react.svg";

function App() {
	const items = [
		{
			label: "PlaceHolder",
			bgColor: "#2f5b61",
			textColor: "#fff",
			fontFamily: "sora, sans-serif",
			links: [
				{ label: "PlaceHolder", ariaLabel: "Placeholder" },
				{ label: "PlaceHolder", ariaLabel: "PlaceHolder" },
			],
		},
		{
			label: "PlaceHolder",
			bgColor: "#2f5b61",
			textColor: "#fff",
			fontFamily: "sora, sans-serif",
			links: [
				{ label: "PlaceHolder", ariaLabel: "PlaceHolder" },
				{ label: "PlaceHolder", ariaLabel: "PlaceHolder" },
			],
		},
		{
			label: "PlaceHolder",
			bgColor: "#2f5b61",
			textColor: "#fff",
			fontFamily: "sora, sans-serif",
			links: [
				{ label: "PlaceHolder", ariaLabel: "PlaceHolder" },
				{ label: "PlaceHolder", ariaLabel: "PlaceHolder" },
				{ label: "PlaceHolder", ariaLabel: "PlaceHolder" },
			],
		},
	];

	return (
		<Router>
			<div className="min-h-screen bg-gray-50">
				<Navbar
					logo={logo}
					logoAlt="Company Logo"
					items={items}
					baseColor="#f6efe2"
					menuColor="#000"
					buttonBgColor="#111"
					buttonTextColor="#fff"
					ease="power3.out"
				/>

				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route
						path="/caracteristicas"
						element={
							<div className="container mx-auto px-4 py-8">
								<h1 className="text-3xl font-bold">Características</h1>
							</div>
						}
					/>
					<Route
						path="/precios"
						element={
							<div className="container mx-auto px-4 py-8">
								<h1 className="text-3xl font-bold">Precios</h1>
							</div>
						}
					/>
					<Route
						path="/contacto"
						element={
							<div className="container mx-auto px-4 py-8">
								<h1 className="text-3xl font-bold">Contacto</h1>
							</div>
						}
					/>
					<Route
						path="/login"
						element={
							<div className="container mx-auto px-4 py-8">
								<h1 className="text-3xl font-bold">Iniciar Sesión</h1>
							</div>
						}
					/>
					<Route
						path="/registro"
						element={
							<div className="container mx-auto px-4 py-8">
								<h1 className="text-3xl font-bold">Registrarse</h1>
							</div>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
