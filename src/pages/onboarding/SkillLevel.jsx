import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SkillLevel() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");

  const levels = [
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const handleContinue = () => {
    if (!selected) return;

    localStorage.setItem("skillLevel", selected);

    navigate("/onboarding/time");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 overflow-y-auto">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          Your Current Skill Level
        </h1>

        <p className="text-gray-400 mb-10">
          So we can guide you accurately.
        </p>

        <div className="space-y-6">

          {levels.map((level, index) => (

            <div
              key={index}
              onClick={() => setSelected(level)}
              className={`p-8 rounded-3xl border cursor-pointer transition-all duration-300

              ${
                selected === level
                  ? "border-cyan-400 bg-cyan-500/20 scale-105 shadow-lg shadow-cyan-500/20"
                  : "border-white/10 bg-white/5 hover:border-cyan-400 hover:bg-cyan-500/10"
              }`}
            >

              <h2 className="text-2xl font-semibold">
                {level}
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