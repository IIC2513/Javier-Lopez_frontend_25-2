import { useNavigate } from "react-router-dom";
function AdminButton() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-16 left-4 z-50">
      <button
        className="bg-[#2f5b61] text-[#f6efe2] px-4 py-2 rounded"
        onClick={() => navigate("/admin-users")}
      >
        Administrar Envios
      </button>
    </div>
  );
}
export default AdminButton;
