import LoginCard from '../components/LoginCard';

export default function Login({ users, setCurrentUser}) {


    return (
        <div className="bg-[#2F5B61] min-h-screen flex flex-col items-center justify-center p-6">
            <LoginCard users={users} setCurrentUser={setCurrentUser} />
        </div>
    );
}