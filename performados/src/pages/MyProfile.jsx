import SelfProfileCard from "../components/SelfProfileCard";

const MyProfile = ({ currentUser, setCurrentUser }) => {
  return (
    <div className="bg-[#2F5B61] min-h-screen flex flex-col items-center justify-center p-6">
      <SelfProfileCard
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
};

export default MyProfile;
