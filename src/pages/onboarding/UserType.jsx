import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UserType() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");

  const userTypes = [
    "School Student",
    "College Student",
    "Working Professional",
    "Career Switcher",
    "Freelancer",
  ];

  const handleContinue = () => {
    if (!selected) return;

    localStorage.setItem("userType", selected);

    navigate("/onboarding/education");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 overflow-y-auto">
      <div className="max-w-3xl w-full mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          Who Are You?
        </h1>

        <p className="text-gray-400 mb-10">
          This helps WaveSights personalize your experience.
        </p>

        <div className="space-y-5">

          {userTypes.map((type, index) => (

            <div
              key={index}
              onClick={() => setSelected(type)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300

              ${
                selected === type
                  ? "border-cyan-400 bg-cyan-500/20 scale-105 shadow-lg shadow-cyan-500/20"
                  : "border-white/10 bg-white/5 hover:border-cyan-400 hover:bg-cyan-500/10"
              }`}
            >

              <h2 className="text-xl font-semibold">
                {type}
              </h2>

            </div>

          ))}

        </div>

        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`w-full mt-10 py-4 rounded-2xl font-bold transition-all

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