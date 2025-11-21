import { useNavigate } from "react-router-dom";

const SelfProfileCard = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };
  const handleLogout = (e) => {
    e.preventDefault();
    setCurrentUser(null);
    navigate("/");
  };
  const handlepurchases = () => {
    navigate("/my-purchases");
  };

  return (
    <div
      className="bg-[#F6EFE2] rounded-b-lg shadow-xl max-w-3xl w-full overflow-hidden relative"
      style={{ fontFamily: "sora, sans-serif" }}
    >
      <div className="bg-[#2F5B61] h-40 p-6"></div>
      <img
        src={
          currentUser?.image ||
          "https://www.svgrepo.com/show/335455/profile-default.svg"
        }
        alt="Profile"
        className="w-36 h-36 rounded-full absolute left-1/2 -translate-x-1/2 top-20 border-4 border-[#F6EFE2] shadow-md"
      />

      <div className="p-8 pt-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold my-2 text-[#2F5B61]">
            {currentUser.name}
          </h2>
          <p className="text-lg font-medium my-2 text-gray-600">
            {currentUser.email}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center my-6">
          <button
            onClick={handleEditProfile}
            className="rounded-lg px-8 py-3 font-sora transition-colors duration-300 bg-[#2F5B61] text-white text-lg hover:opacity-90 w-full sm:w-auto"
          >
            Editar tu perfil
          </button>
          <button
            onClick={handleLogout}
            className="rounded-lg px-8 py-3 font-sora transition-colors duration-300 border border-[#2F5B61] text-[#2F5B61] text-lg hover:bg-[#2F5B61] hover:text-white w-full sm:w-auto"
          >
            Cerrar sesión
          </button>
          <button
            onClick={handlepurchases}
            className="rounded-lg px-8 py-3 font-sora transition-colors duration-300 bg-[#2F5B61] text-white text-lg hover:opacity-90 w-full sm:w-auto"
          >
            Mis compras
          </button>
          
        </div>
        <div className="mt-8 text-left">
          <p className="text-lg font-bold my-2 text-[#2F5B61]">
            Tu descripción:
          </p>
          <textarea
            value={currentUser.description || "No posees una descripción."}
            readOnly
            disabled
            className="w-full h-32 p-3 border border-[#d3c9b6] rounded my-2 resize-none text-gray-700 bg-[#efe6d2] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
export default SelfProfileCard;
