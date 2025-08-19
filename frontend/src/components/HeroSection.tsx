import { Calendar, MapPin, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/7546724/pexels-photo-7546724.jpeg?_gl=1*19xe79q*_ga*MTcyMjc0NjE0MS4xNzU1NDkwNjY2*_ga_8JE65Q40S6*czE3NTU1MzI0MzYkbzIkZzEkdDE3NTU1MzI0MzckajU5JGwwJGgw')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Book Beautiful Stays
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Discover top locations with flexible rentals and unforgettable
          experiences.
        </p>

        <div className="bg-[#FFF9E9] rounded-xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 w-full md:w-auto border rounded-lg px-4 py-2">
            <MapPin className="text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="City"
              className="bg-[#FFF9E9] outline-none flex-1 text-gray-700"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto border rounded-lg px-4 py-2">
            <Calendar className="text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Dates"
              className="bg-[#FFF9E9] outline-none flex-1 text-gray-700"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto border rounded-lg px-4 py-2">
            <Users className="text-gray-500 w-5 h-5" />
            <input
              type="number"
              min="1"
              defaultValue={1}
              className=" bg-[#FFF9E9] outline-none w-16 text-gray-700"
            />
            <span className="text-gray-500 text-sm">Guests</span>
          </div>
          <button className="bg-[#284E4C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1e3938] transition w-full md:w-auto">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
