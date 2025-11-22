import { useState, useEffect } from "react";

const DELIVERY_STATUS_OPTIONS = [
	{ value: "Paid", label: "Pagado" },
	{ value: "Shipped", label: "Enviado" },
	{ value: "Delivered", label: "Entregado" },
	{ value: "Cancelled", label: "Cancelado" },
];

export default function AdminEditSaleModal({
	Open,
	onClose,
	onSubmit,
	defaultValue,
}) {
	const [editedState, setEditedState] = useState(defaultValue ?? "");

	useEffect(() => {
		setEditedState(defaultValue ?? "");
	}, [defaultValue]);

	if (!Open) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-[#F6EFE2] p-6 rounded-lg shadow-lg w-11/12 max-w-md h-auto">
				<div className="flex flex-col h-full justify-between">
					<h2 className="text-3xl font-bold text-[#2F5B61] text-center pt-4 mb-6">
						Editar estado de envío
					</h2>

					<div className="relative mb-8">
						<select
							className="border border-[#2F5B61] w-full p-3 rounded-lg text-[#2F5B61] bg-white focus:outline-none focus:ring-2 focus:ring-[#2F5B61] appearance-none cursor-pointer"
							value={editedState}
							onChange={(e) => setEditedState(e.target.value)}
						>
							<option value="" disabled>
								Seleccione un estado
							</option>
							{DELIVERY_STATUS_OPTIONS.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#2F5B61]">
							<svg
								className="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
							</svg>
						</div>
					</div>

					<div className="flex justify-end space-x-4 mt-4">
						<button
							className="rounded-lg px-6 py-2 font-sora transition-colors duration-300 border border-[#2F5B61] text-[#2F5B61] text-lg hover:bg-[#2F5B61] hover:text-white w-full sm:w-auto"
							onClick={onClose}
						>
							Cancelar
						</button>
						<button
							className="rounded-lg px-6 py-2 font-sora transition-colors duration-300 bg-[#2f5b61] text-lg text-white hover:opacity-90 w-full sm:w-auto"
							onClick={() => onSubmit(editedState)}
						>
							Guardar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
