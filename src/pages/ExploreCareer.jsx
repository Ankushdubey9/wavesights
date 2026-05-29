import React from "react";
import { useNavigate } from "react-router-dom";

export default function ExploreCareer() {
  const navigate = useNavigate();

  const currentJourney =
    localStorage.getItem("userType") || "Not Selected";

  const selectedJourney =
    localStorage.getItem("previewUserType") || "Unknown";

  return (
    <div className="min-h-screen bg-[#020817] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-5xl font-black text-cyan-400 mb-4">
          Explore Career Path
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Learn about other career paths without affecting your current profile.
        </p>

        {/* Current Journey Warning */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-3xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            ⚠ Current Journey
          </h2>

          <p className="text-lg text-gray-300">
            You are currently following:
          </p>

          <p className="text-3xl font-bold text-cyan-400 mt-2">
            {currentJourney}
          </p>

          <p className="text-gray-400 mt-4">
            Your dashboard, recommendations, roadmap and progress tracking are
            optimized for this journey.
          </p>
        </div>

        {/* Selected Journey */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Exploring:
          </h2>

          <h3 className="text-4xl font-black text-cyan-400 mb-6">
            {selectedJourney}
          </h3>

          <p className="text-gray-300 text-lg">
            Since your profile is currently configured for{" "}
            <span className="font-bold text-cyan-400">
              {currentJourney}
            </span>
            , we cannot provide a fully personalized roadmap for{" "}
            <span className="font-bold text-cyan-400">
              {selectedJourney}
            </span>
            .
          </p>

          <p className="text-gray-400 mt-4">
            You can either ask WaveSights AI about this field or switch your
            journey to receive personalized recommendations.
          </p>
        </div>

        {/* AI Suggestions */}
        <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">
            🤖 Ask WaveSights AI
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-white/5 p-4 rounded-2xl">
              What skills are required in this field?
            </div>

            <div className="bg-white/5 p-4 rounded-2xl">
              Career roadmap for beginners
            </div>

            <div className="bg-white/5 p-4 rounded-2xl">
              Salary and growth opportunities
            </div>

            <div className="bg-white/5 p-4 rounded-2xl">
              Best internships and certifications
            </div>

          </div>

          <button
  onClick={() => {
    localStorage.setItem(
      "exploreCareer",
      selectedJourney
    );

    navigate("/ai-chat");
  }}
  className="mt-8 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-bold transition duration-300"
>
  🤖 Open WaveSights AI →
</button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 border border-white/20 hover:border-cyan-400 py-4 rounded-2xl font-bold transition duration-300"
          >
            🏠 Back to Dashboard
          </button>

          <button
            onClick={() => {
              const confirmSwitch = window.confirm(
                `Switch your career path from "${currentJourney}" to "${selectedJourney}"?`
              );

              if (confirmSwitch) {
                localStorage.setItem(
                  "userType",
                  selectedJourney
                );

                alert(
                  "Career journey updated successfully."
                );

                navigate("/dashboard");
              }
            }}
            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-2xl font-bold transition duration-300"
          >
            🔄 Switch To This Journey
          </button>

        </div>
      </div>
    </div>
  );
}