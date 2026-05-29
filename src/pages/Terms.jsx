import React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-cyan-400">
          Terms & Conditions
        </h1>

        <p className="text-gray-400 mb-8">
          Last Updated: May 2026
        </p>

        <p className="text-gray-300 mb-6">
          By using WaveSights, you agree to these Terms & Conditions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Platform Purpose
        </h2>

        <p className="text-gray-300">
          WaveSights provides AI-powered career guidance, learning roadmaps,
          resume suggestions, and career recommendations.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          User Responsibilities
        </h2>

        <ul className="list-disc ml-6 space-y-2 text-gray-300">
          <li>Provide accurate information.</li>
          <li>Use the platform responsibly.</li>
          <li>Respect platform rules and services.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Disclaimer
        </h2>

        <p className="text-gray-300">
          AI recommendations are for informational purposes only and should not
          be considered professional career advice.
        </p>
      </div>
    </div>
  );
}