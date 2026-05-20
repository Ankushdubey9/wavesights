import { useNavigate } from "react-router-dom";

export default function ProfileSelect() {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    localStorage.setItem("userType", type);
    navigate("/dashboard");
  };

  const profiles = [
    {
      title: "Tech Student",
      description: "AI, Web Development, DSA, Placements",
      emoji: "💻",
      type: "tech",
    },
    {
      title: "Arts Student",
      description: "Psychology, Media, Design, Writing",
      emoji: "🎨",
      type: "arts",
    },
    {
      title: "Commerce Student",
      description: "Finance, Banking, Marketing, CA",
      emoji: "📈",
      type: "commerce",
    },
    {
      title: "Medical Student",
      description: "Healthcare, Research, Biology",
      emoji: "🩺",
      type: "medical",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020817] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black mb-6">
            Choose Your <span className="text-cyan-400">Career Path</span>
          </h1>

          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            WaveSights will personalize your dashboard and AI guidance according
            to your profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-cyan-400/40 hover:-translate-y-2 transition duration-300"
            >
              <div className="text-6xl mb-6">{profile.emoji}</div>

              <h2 className="text-3xl font-bold mb-4">
                {profile.title}
              </h2>

              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {profile.description}
              </p>

              <button
                onClick={() => handleSelect(profile.type)}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-2xl font-black transition duration-300"
              >
                Continue
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}