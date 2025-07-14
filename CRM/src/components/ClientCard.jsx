import { Link } from "react-router-dom";

export default function ClientCard({ client }) {
  return (
    <Link to={`/client/${client.id}`} className="block">
      <div className="bg-white p-5 rounded-lg shadow-sm border border-border-color hover:shadow-md hover:border-primary transition-all cursor-pointer h-full">
        <h3 className="text-lg text-text-main font-bold truncate">{client.name}</h3>
        <p className="text-sm text-text-light mt-1">{client.email}</p>
        <p className="text-sm text-text-light">{client.phone}</p>

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