import UserSalesList from "../components/userSalesList.jsx";
import api from "../api";

export default function UserSalesView({ currentUser, token }) {
  return (
    (currentUser && currentUser.role === "admin" && (
      <div className="bg-[#2F5B61] min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <UserSalesList currentUser={currentUser} token={token} />
        </div>
      </div>
    )) || (
      <div className="bg-[#2F5B61] min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center text-white mt-10">Acceso denegado</div>
        <div className="text-center text-white mt-2">
          Solo Javier Lopez puede acceder a esta página.
        </div>
      </div>
    )
  );
}
