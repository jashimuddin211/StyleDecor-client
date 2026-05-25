import { useEffect, useState } from "react";
import {  MapPin,  Star, Briefcase, Calendar } from "lucide-react";

const AVATAR_COLORS = [
  { bg: "#E6F1FB", text: "#0C447C" },
  { bg: "#E1F5EE", text: "#085041" },
  { bg: "#FAEEDA", text: "#633806" },
  { bg: "#FBEAF0", text: "#72243E" },
  { bg: "#EEEDFE", text: "#3C3489" },
  { bg: "#FAECE7", text: "#712B13" },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AllDecorators() {
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Filtering states
  const [searchTerm] = useState("");
  const [selectedSpecialty] = useState("All");

  useEffect(() => {
    const fetchDecorators = async () => {
      try {
        const res = await fetch("http://localhost:4000/decorators");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        // Show only approved decorators
        const approved = data.filter(d => d.isApproved !== false);
        setDecorators(approved);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDecorators();
  }, []);

  

  // Filter logic
  const filteredDecorators = decorators.filter(d => {
    const matchesSearch = 
      d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = 
      selectedSpecialty === "All" || d.specialty === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-12 animate-fadeIn">
      {/* HEADER BANNER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-100">
          Professional Designers
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-none">
          Our Specialist Decorators
        </h1>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          Browse through our network of vetted creative designers. Filter by their specialty and view their details and portfolios.
        </p>
      </div>

      

      {/* RENDER GRID OR LOADERS */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-3xl p-6 space-y-4 animate-pulse">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto" />
              <div className="h-4 bg-gray-100 rounded-md w-1/2 mx-auto" />
              <div className="h-3 bg-gray-100 rounded-md w-3/4 mx-auto" />
              <div className="h-3 bg-gray-100 rounded-md w-1/3 mx-auto" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm">
          <p className="text-sm text-gray-400">Could not fetch decorators list. Ensure backend is running.</p>
        </div>
      ) : filteredDecorators.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm">
          <h3 className="text-xl font-bold text-gray-800">No decorators found</h3>
          <p className="text-xs text-gray-400 mt-1">Try refining your search keyword or selected specialties.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDecorators.map((d, index) => {
            const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
            return (
              <div key={d._id} className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col items-center text-center relative group">
                {/* Rating Badge */}
                <div className="absolute top-5 right-5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-xl text-xs font-black border border-amber-100 flex items-center gap-1 shadow-sm">
                  <Star size={12} className="fill-amber-600 text-amber-600" />
                  {parseFloat(d.rating || 5.0).toFixed(1)}
                </div>

                {/* Avatar Icon / Image */}
                {d.image ? (
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-20 h-20 rounded-full object-cover border border-gray-100 shadow-sm mb-4 group-hover:scale-105 transition duration-200"
                  />
                ) : (
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-sm border border-white"
                    style={{ background: color.bg, color: color.text }}
                  >
                    {getInitials(d.name)}
                  </div>
                )}

                {/* Info Block */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-lg text-gray-900 leading-tight">{d.name}</h3>
                  <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold tracking-wider uppercase rounded-full border border-blue-50/50 mt-1">
                    {d.specialty || "Specialist Designer"}
                  </span>
                </div>

                {/* Stats Table */}
                <div className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-xs space-y-2.5 text-gray-600 mt-5 mb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-400 flex items-center gap-1">
                      <Briefcase size={12} /> Experience:
                    </span>
                    <span className="font-extrabold text-gray-900">{d.experienceYears || 1} Years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-400 flex items-center gap-1">
                      <Calendar size={12} /> Projects:
                    </span>
                    <span className="font-extrabold text-gray-900">{d.totalProjects || 0} Finished</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-400 flex items-center gap-1">
                      <MapPin size={12} /> Coverage:
                    </span>
                    <span className="font-extrabold text-gray-900">{d.location || "Dhaka, BD"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
