import { useParams } from "react-router-dom";
import { useClientStore } from "../store/clientStore";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ClientDetailPage() {
  const { id } = useParams();
  const clientId = Number(id);
  const { clients, addNoteToClient, deleteNoteFromClient } = useClientStore();
  const client = clients.find((c) => c.id === clientId);
  const [noteInput, setNoteInput] = useState("");

  if (!client) {
    return <div className="text-center text-error mt-10">Client not found.</div>;
  }

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    addNoteToClient(clientId, noteInput.trim());
    toast.success("Note added");
    setNoteInput("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-text-main">{client.name}</h2>
        <p className="text-text-light mt-1">{client.email} · {client.phone}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {client.tags.map((tag, idx) => (
            <span key={idx} className="text-xs bg-blue-100 text-primary font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border-color">
        <h3 className="text-xl font-bold mb-4 text-text-main">Notes</h3>
        <div className="space-y-3">
          {client.notes.map((note, idx) => (
            <div key={idx} className="bg-secondary p-4 rounded-md flex justify-between items-center">
              <span className="text-text-main">{note}</span>
              <button
                onClick={() => {
                  deleteNoteFromClient(clientId, idx);
                  toast.error("Note deleted");
                }}
                className="text-text-light hover:text-error text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
          {client.notes.length === 0 && (
            <p className="text-text-light text-center py-4">No notes yet.</p>
          )}
        </div>

        {/* Add Note Form */}
        <div className="flex mt-6 gap-2">
          <input
            type="text" placeholder="Write a new note..." value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button onClick={handleAddNote} className="bg-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-primary-hover transition">
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
}