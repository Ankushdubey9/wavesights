import React from "react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-cyan-400">
          Privacy Policy
        </h1>

        <p className="text-gray-400 mb-8">
          Last Updated: May 2026
        </p>

        <p className="mb-6 text-gray-300">
          At WaveSights, we value your privacy and are committed to protecting
          your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Information We Collect
        </h2>

        <ul className="list-disc ml-6 space-y-2 text-gray-300">
          <li>Name and email address.</li>
          <li>Career preferences and profile information.</li>
          <li>Usage analytics for platform improvement.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          How We Use Your Data
        </h2>

        <ul className="list-disc ml-6 space-y-2 text-gray-300">
          <li>Provide AI-powered career guidance.</li>
          <li>Improve user experience.</li>
          <li>Respond to support requests.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Contact
        </h2>

        <p className="text-gray-300">
          Email: wavesights.ai@gmail.com
        </p>
      </div>
    </div>
  );
}