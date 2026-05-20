import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function InterestSelection() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");

  const interests = [
    "AI / ML",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "UI/UX Design",
    "Digital Marketing",
    "Content Creation",
    "Finance",
    "Product Management",
  ];

  const handleContinue = () => {
    if (!selected) return;

    localStorage.setItem("interest", selected);

    navigate("/onboarding/goals");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 overflow-y-auto">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          Select Your Interests
        </h1>

        <p className="text-gray-400 mb-10">
          Choose areas you want to grow in.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {interests.map((interest, index) => (

            <div
              key={index}
              onClick={() => setSelected(interest)}
              className={`p-8 rounded-3xl border cursor-pointer transition-all duration-300

              ${
                selected === interest
                  ? "border-cyan-400 bg-cyan-500/20 scale-105 shadow-lg shadow-cyan-500/20"
                  : "border-white/10 bg-white/5 hover:border-cyan-400 hover:bg-cyan-500/10"
              }`}
            >

              <h2 className="text-2xl font-semibold">
                {interest}
              </h2>

            </div>

          ))}

        </div>

        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`w-full mt-12 py-5 rounded-2xl font-bold text-lg transition-all

          ${
            selected
              ? "bg-cyan-500 hover:bg-cyan-400 text-black"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>

      </div>

    </div>
  );
}