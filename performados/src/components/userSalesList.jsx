import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserSalesList({ currentUser, token }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const patchSale = async (saleId, updatedData) => {
    try {
      const response = await api.patch(`/sales/${saleId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error updating sale:", err);
      throw err;
    }
  };

  const getSales = async (userId) => {
    try {
      const response = await api.get(`/sales/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching sales:", err);
      throw err;
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getSales(id);
        if (mounted) setSales(data || []);
      } catch (err) {
        if (mounted) setError(err.message || "Error fetching sales");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className="mt-[10rem] bg-[#F6EFE2] rounded-lg shadow-xl max-w-3xl w-full overflow-hidden relative">
      <div className="p-6">
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ fontFamily: "sora, sans-serif" }}
        >
          Lista de Envios del Usuario
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left">
                  Productos
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">
                  Placeholder
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">
                  Editar
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
                    Cargando envios...
                  </td>
                </tr>
              ) : sales.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    No hay envios para este usuario.
                  </td>
                </tr>
              ) : (
                sales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {(sale.orderItems || []).map((product) => (
                        <div
                          key={
                            product.product?.id ?? product.id ?? Math.random()
                          }
                        >
                          {product.product?.name ?? product.name ?? "-"}
                        </div>
                      ))}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {sale.deliveryStatus ?? "-"}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        type="button"
                        onClick={async () => {
                          const newVal = window.prompt(
                            "Actualizar estado de envio",
                            sale.deliveryStatus ?? ""
                          );
                          if (newVal === null) return;
                          try {
                            const updated = await patchSale(sale.id, {
                              deliveryStatus: newVal,
                            });
                            setSales((prev) =>
                              prev.map((s) =>
                                s.id === sale.id
                                  ? { ...s, ...(updated || {}) }
                                  : s
                              )
                            );
                          } catch (err) {
                            console.error(err);
                            window.alert("Error actualizando la venta");
                          }
                        }}
                        className="rounded-lg px-8 py-3 my-2 font-sora transition-colors duration-300 bg-[#2f5b61] text-sm text-white hover:opacity-90 w-full sm:w-auto"
                      >
                        Editar
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
