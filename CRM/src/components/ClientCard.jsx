'use client';
import { Link } from "react-router-dom";
import { useCrmStore } from "../store/crmStore";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function ClientCard({ client }) {
  const deleteClient = useCrmStore((state) => state.deleteClient);

  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent Link navigation

    const result = await Swal.fire({
      title: `Delete ${client.name}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626", // Red
      cancelButtonColor: "#6b7280", // Gray
      confirmButtonText: "Yes, delete it",
      background: "#fff",
      color: "#1f2937"
    });

    if (result.isConfirmed) {
      deleteClient(client.id);
      Swal.fire("Deleted!", `${client.name} has been removed.`, "success");
    }
  };

  return (
    <Link to={`/client/${client.id}`} className="block relative group">
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 z-10 text-red-500 hover:text-red-600"
        title="Delete client"
      >
        <Trash2 size={18} />
      </button>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-border-color hover:shadow-md hover:border-primary transition-all cursor-pointer h-full">
        <h3 className="text-lg text-text-main dark:text-white font-bold truncate">
          {client.name}
        </h3>
        <p className="text-sm text-text-light dark:text-gray-300 mt-1">{client.email}</p>
        <p className="text-sm text-text-light dark:text-gray-300">{client.phone}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {client.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-100 text-primary font-semibold px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
