import RegisterCard from "../components/RegisterCard";
export default function Register({ users, setUsers, setCurrentUser}) {
    return (
         
        <div className="bg-[#2F5B61] min-h-screen flex flex-col items-center justify-center p-6">
            <RegisterCard users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />
        </div>
    );
}