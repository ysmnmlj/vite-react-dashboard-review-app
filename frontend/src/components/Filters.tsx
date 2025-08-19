export default function Filters({ filters, setFilters }: any) {
  return (
    <div className="flex flex-wrap gap-4">
      <select
        className="border rounded p-2"
        onChange={e => setFilters({ ...filters, rating: e.target.value })}
      >
        <option value="">All Ratings</option>
        {[10, 9, 8, 7, 6, 5].map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <select
        className="border rounded p-2"
        onChange={e => setFilters({ ...filters, channel: e.target.value })}
      >
        <option value="">All Channels</option>
        <option value="Airbnb">Airbnb</option>
        <option value="Booking.com">Booking.com</option>
        <option value="vrbo">vrbo</option>

        <option value="Google">Google</option>
      </select>

      <select
        className="border rounded p-2"
        onChange={e => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">All Categories</option>
        <option value="cleanliness">Cleanliness</option>
        <option value="communication">Communication</option>
        <option value="respect_house_rules">House Rules</option>
      </select>
    </div>
  );
}
