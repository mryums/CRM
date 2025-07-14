import { useState } from "react";
import { useCrmStore } from "../store/crmStore";

export default function AddClientModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", tags: "" });
  const addClient = useCrmStore((state) => state.addClient);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newClientData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(tag => tag),
    };
    addClient(newClientData); // The store will handle adding it to the pipeline
    setForm({ name: "", email: "", phone: "", tags: "" });
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover font-semibold transition"
      >
        + Add Lead
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-text-main">Add New Lead</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text" placeholder="Full Name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} required
                className="w-full border border-border-color p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email" placeholder="Email Address" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} required
                className="w-full border border-border-color p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text" placeholder="Phone Number" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} required
                className="w-full border border-border-color p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text" placeholder="Tags (comma separated)" value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full border border-border-color p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-border-color rounded-md font-semibold text-text-light hover:bg-secondary transition"
                >
                  Cancel
                </button>
                <button type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}