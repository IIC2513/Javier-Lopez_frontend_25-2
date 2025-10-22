import {useNavigate} from "react-router-dom";

const SelfProfileCard = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="mt-[6rem] bg-[#F6EFE2] flex flex-row justify-center items-center gap-8 rounded-2xl shadow-md p-6">
      <div className="flex align-left flex-col p-6 ">
        <h2 className="text-xl font-bold my-2 text-[#2F5B61]">{currentUser.name}</h2>
        <p className="text-xl font-bold my-2 text-[#2F5B61]">Email: {currentUser.email}</p>
        <p className="text-xl font-bold my-2 text-[#2F5B61]">Tu descripción:</p>
        <textarea
          value={currentUser.description || 'No posees una descripción.'}
          readOnly
          disabled
          resize="none"
          className="w-96 h-32 p-2 border border-[#2F5B61] rounded my-2 resize-none text-[#2F5B61]"
        />
      </div>
      <div className=" flex items-center justify-center flex-col p-6">
        <img src={currentUser?.image || "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"}
           alt="Profile" className="w-36 h-36 rounded-full" />
        <button onClick={handleEditProfile} className="rounded-lg px-8 py-3 my-2 font-sora transition-colors duration-300 border border-[#2F5B61] text-[#2F5B61] text-xl hover:bg-[#2F5B61] hover:text-white">

        Editar tu perfil
      </button>
    </div>
    </div>
  );
};
export default SelfProfileCard;