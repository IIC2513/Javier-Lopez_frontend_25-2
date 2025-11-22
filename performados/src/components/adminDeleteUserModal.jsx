import { useState, useEffect } from "react";
export default function AdminDeleteUserModal({
  Open,
  onClose,
  onSubmit,
  userName,
}) {
  if (!Open) return null;
  return (
    <div className="fixed inset-0 bg-[#2F5B61] flex items-center justify-center z-50">
      <div className="bg-[#F6EFE2] p-6 rounded-lg shadow-lg w-11/12 max-w-md h-64">
        <div className="flex flex-col h-full justify-between">
          <h2 className="text-3xl font-bold text-[#2F5B61] text-center pt-4">
            Confirmar eliminación de usuario
          </h2>
          <p className="text-center text-lg text-[#2F5B61]">
            ¿Estás seguro de que deseas eliminar a "{userName}"?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              className="rounded-lg px-8 py-3 my-2 font-sora transition-colors duration-300 border border-[#2F5B61] text-[#2F5B61] text-lg hover:bg-[#2F5B61] hover:text-white w-full sm:w-auto"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="px-4 rounded-lg px-8 py-3 my-2 font-sora transition-colors duration-300 bg-[#2f5b61] text-sm text-white hover:opacity-90 w-full sm:w-auto"
              onClick={() => onSubmit()}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
