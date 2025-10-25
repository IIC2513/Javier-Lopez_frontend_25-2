import SelfProfileForm from "../components/EditProfileForm";

export default function EditProfile({currentUser, setCurrentUser, users, setUsers}) {
    return (
        <div className="bg-[#2F5B61] min-h-screen flex flex-col items-center justify-center p-6">
            <SelfProfileForm currentUser={currentUser} setCurrentUser={setCurrentUser}
                            users={users} setUsers={setUsers} />
        </div>
        );
}