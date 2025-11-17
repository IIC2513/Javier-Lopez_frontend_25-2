import api from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminUsersList({ currentUser, token }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const data = await getUsers();
      if (mounted) setUsers(data);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mt-[10rem] bg-[#F6EFE2] rounded-lg shadow-xl max-w-3xl w-full overflow-hidden relative">
      <div className="p-6">
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ fontFamily: "sora, sans-serif" }}
        >
          Lista de Usuarios
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left">
                  Imagen
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">
                  Nombre
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">
                  Email
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">
                  Rol
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">
                  Ver envios
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    Cargando usuarios...
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <img
                        src={
                          user.image ||
                          "https://www.svgrepo.com/show/335455/profile-default.svg"
                        }
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://www.svgrepo.com/show/335455/profile-default.svg";
                        }}
                        alt="User Image"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {user.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {user.email}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {user.role}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        onClick={() => navigate(`/admin-users/${user.id}`)}
                        className="rounded-lg px-8 py-3 my-2 font-sora transition-colors duration-300 bg-[#2f5b61] text-sm text-white hover:opacity-90 w-full sm:w-auto"
                      >
                        Ver envios
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
