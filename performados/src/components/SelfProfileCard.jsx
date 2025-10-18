import {useNavigate} from "react-router-dom";

const SelfProfileCard = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="mt-[6rem] bg-white flex items-center justify-center flex-col p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold my-2 text-[#2F5B61]">{currentUser.name}</h2>
      <p className="text-xl font-bold my-2 text-[#2F5B61]">Email: {currentUser.email}</p>
      <button onClick={handleEditProfile} className="rounded-lg px-8 py-3 my-2 font-sora transition-colors duration-300 border border-[#2F5B61] text-[#2F5B61] text-xl hover:bg-[#2F5B61] hover:text-white">
        Editar tu perfil
      </button>
    </div>
  );
};
export default SelfProfileCard;