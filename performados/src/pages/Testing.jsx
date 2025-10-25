import AnimatedContent from "../components/animacion"; 
import matcha from "../assets/matcha.png"; 
import FallingText from "../components/FallingText";

export default function Testing() {
    return (
        <div className="w-screen h-screen bg-gray-900 text-white "
		    style={{ fontFamily: "MidnightGelactic, sans-serif",color: "#f6efe2" }}> 
            <FallingText
                text={`P E R F O R M A D O S`}
                highlightClass="highlighted" 
                trigger="auto"
                backgroundColor="transparent" 
                wireframes={false}
                gravity={0.56}
                fontSize="10rem"
                mouseConstraintStiffness={0.9}
            />
        </div>
    );
}