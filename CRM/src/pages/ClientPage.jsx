import { useState } from "react";
import ClientCard from "../components/ClientCard";
import { useCrmStore } from "../store/crmStore";
import AddClientModal from "../components/AddClientModal";

export default function ClientsPage() {
  const { clients, pipeline } = useCrmStore();

  // Get IDs from the "Won" column
  const wonClientIds = pipeline["column-4"]?.itemIds || [];

  // Get full client data for won clients
  const wonClients = wonClientIds.map((id) => clients[id]);

  // --- Search & Filter State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  // Get all unique tags from won clients
  const allTags = [...new Set(wonClients.flatMap((c) => c.tags))];

  // Filter based on search and tag
  const filteredClients = wonClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery);

    const matchesTag =
      tagFilter === "" || client.tags.includes(tagFilter);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-text-main dark:text-white">Clients</h2>
        <AddClientModal />
      </div>

      {/* Search + Filter UI */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="px-4 py-2 border border-border-color rounded-md bg-white text-text-main"
        >
          <option value="">All Tags</option>
          {allTags.map((tag, idx) => (
            <option key={idx} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Client List */}
      {filteredClients.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      ) : (
        <p className="text-text-light text-center py-8">
          No matching clients found in the "Won" stage.
        </p>
      )}
    </div>
  );
}
