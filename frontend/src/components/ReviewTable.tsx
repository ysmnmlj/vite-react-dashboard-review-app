import { Star } from "lucide-react";

export default function ReviewTable({ reviews, filters, approved, toggleApprove }: any) {
  const filtered = reviews.filter((r: any) => {
    if (filters.rating && r.rating !== filters.rating) return false;
    if (filters.channel && r.channel !== filters.channel) return false;
    return true;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
          <tr>
            <th className="px-4 py-2">Property</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Channel</th>
            <th className="px-4 py-2">Review</th>
            <th className="px-4 py-2">Approved</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filtered.map((r: any) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{r.listing}</td>
              <td className="px-4 py-2">{r.guestName}</td>
              <td className="px-4 py-2 flex items-center gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < r.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </td>
              <td className="px-4 py-2">{r.channel}</td>
              <td className="px-4 py-2 text-gray-700">{r.reviewText}</td>
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-emerald-600"
                  checked={approved[r.id] || false}
                  onChange={() => toggleApprove(r.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
