import RegisterCard from "../components/RegisterCard";
import FallingText from "../components/FallingText";

export default function Register({
  users,
  setUsers,
  setCurrentUser,
  currentID,
  setCurrentID,
  setToken,
}) {
  return (
    <div className="bg-[#2F5B61] min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div
        className="absolute inset-0 z-10"
        style={{ fontFamily: "MidnightGelactic, sans-serif", color: "#f6efe2" }}
      >
        <FallingText
          text={`L A B U B U T O T E B A G P E R F O R M A D O S M A T C H A C H A L O`}
          trigger="auto"
          backgroundColor="transparent"
          highlightWords={["P E R F O R M A D O S"]}
          highlightClass="highlighted"
          wireframes={false}
          gravity={0.56}
          fontSize="6rem"
          mouseConstraintStiffness={0.5}
        />
      </div>

      <div className="relative z-20">
        <RegisterCard
          users={users}
          setUsers={setUsers}
          setCurrentUser={setCurrentUser}
          currentID={currentID}
          setCurrentID={setCurrentID}
          setToken={setToken}
        />
      </div>
    </div>
  );
}
