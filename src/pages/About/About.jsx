import { ShieldCheck, Award, Heart, Sparkles, Users, Calendar, MapPin } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Successful Events", value: "850+", icon: <Calendar size={22} className="text-blue-600" /> },
    { label: "Specialist Decorators", value: "45+", icon: <Users size={22} className="text-purple-600" /> },
    { label: "Satisfied Customers", value: "1,200+", icon: <Heart size={22} className="text-pink-600" /> },
    { label: "Cities Serviced", value: "12+", icon: <MapPin size={22} className="text-emerald-600" /> }
  ];

  const values = [
    {
      title: "Exquisite Artistry",
      desc: "Our decorators treat every event as a masterpiece canvas, delivering breathtaking layouts tailored specifically to your aesthetic vision.",
      icon: <Sparkles size={24} className="text-blue-500" />
    },
    {
      title: "Secure & Reliable",
      desc: "We offer end-to-end secure transactions via Stripe, and guarantee only approved, validated specialists are assigned to your bookings.",
      icon: <ShieldCheck size={24} className="text-purple-500" />
    },
    {
      title: "Award-Winning Quality",
      desc: "Voted top event decorators for three consecutive years due to our focus on high-fidelity materials, attention to details, and punctuality.",
      icon: <Award size={24} className="text-pink-500" />
    }
  ];

  const team = [
    {
      name: "Sabrina Al-Mamun",
      role: "Lead Creative Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "12+ years experience in wedding planning and luxury hotel interiors across South Asia."
    },
    {
      name: "Tariqul Islam",
      role: "Head Floral Designer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
      bio: "Master florist specialized in dynamic floral arches, natural installations, and botanical designs."
    },
    {
      name: "Zoya Chowdhury",
      role: "Senior Corporate Strategist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      bio: "Specializes in high-fidelity corporate galas, visual branding setups, and large-scale exhibition decors."
    }
  ];

  return (
    <div className="space-y-20 py-10 px-4 max-w-7xl mx-auto animate-fadeIn">
      {/* HERO HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-100">
          Who We Are
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-none mt-2">
          Crafting Breathtaking Spaces & Event Masterpieces
        </h1>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed mt-4">
          StyleDecor is a premier event decoration platform designed to bridge the gap between premium design visions and approved on-site decorators. We turn venues into unforgettable visual memories.
        </p>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm flex items-center gap-4 hover:shadow-md transition duration-200">
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-50">
              {item.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
              <h3 className="text-2xl font-black text-gray-950 mt-0.5">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* CORE VALUES */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">Our Core Principles</h2>
          <p className="text-gray-400 text-sm">We maintain premium standards to deliver consistency in every project.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-4 hover:shadow-md transition duration-200">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-50 shadow-sm shrink-0">
                {val.icon}
              </div>
              <h3 className="font-extrabold text-xl text-gray-950 mt-2">{val.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MEET THE CREATIVES */}
      <div className="space-y-12 pb-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">Meet the Creatives</h2>
          <p className="text-gray-400 text-sm">The visionaries behind our premium event catalogues.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((person, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition duration-200">
              <div className="h-64 overflow-hidden relative">
                <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm border border-gray-50">
                  {person.role}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col gap-2">
                <h3 className="font-bold text-lg text-gray-950">{person.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{person.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
